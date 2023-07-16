from paramiko import SSHClient, AutoAddPolicy
from flask import jsonify, make_response, request, session as browser_session
from time import sleep
from models import app, db, User, Commands
import bcrypt
import ast
import os

# instance of paramiko
client = SSHClient()

# the secret key    
app.secret_key = os.environ.get("SECRET_KEY")
      
# route to login
@app.route("/registerLogin", methods = ['POST'])
def register_login():
    # gets the users login info
    user_info =  request.get_json()
    username = user_info.get("username")
    password = user_info.get("password")
    # encode the password 
    encoded_password = password.encode('utf-8')
    #  check if user actually exists  
    user_exists = User.query.filter((User.username == username)).first()
    #  checks if the username and password match
    if user_exists and (bcrypt.checkpw(encoded_password, user_exists.password)):
        # if user_exists:        
        print(user_exists.to_dict())
        # changes the user to an old one so the frony end will render 'Welcome Back'
        user_exists.old_user = True
        db.session.commit()
        # sets a cookie as the id of the existing user
        browser_session['user_id'] = user_exists.id  
        return user_exists.to_dict(), 200
    #  checks if username is already taken, 
    #  this will only run if the usernae was entered but the password was incorrect
    elif user_exists:
        return {}, 404
    # this will create a new user
    else:                 
        new_user = User(username = username, password = bcrypt.hashpw(encoded_password, bcrypt.gensalt()))
        db.session.add(new_user)
        db.session.commit()    
        # sets a cookie as the id of the new user
        new_user_after_being_commited = User.query.filter(User.username == username and password == bcrypt.checkpw(encoded_password, new_user.password)).first()
        browser_session['user_id'] = new_user.id
        print("New user: ", new_user.to_dict())
        return new_user.to_dict(), 201
  
                
#checks for the cookie
@app.route("/checkCookie")
def check_cookie():
    if 'user_id' in browser_session:
        active_user = User.query.get(browser_session['user_id'])
        return active_user.to_dict(), 200
        # return {"test" : "test"}, 200
    else:
        return {'status' : 'no user currently logged in'}, 404     


# deletes the cookie
@app.route("/logOut", methods=['DELETE'])
def logout():
    if "user_id" in browser_session:    
        browser_session.pop('user_id', default=None)
        return { "status" : "cookie deleted" }, 200
    else:
        return { "status" : "user not found" }, 404  

# deletes the account of the user loggin in
@app.route("/delete_account")
def delete_account():
    active_user = User.query.get(browser_session['user_id'])
    db.session.delete(active_user)
    db.session.commit()
    browser_session.pop('user_id', default = None)
    return {'status': 'user deleted'}, 200
   


# save the flight ""COMMANDS"" to the database
@app.route("/save_route_to_selected_commands", methods = ['GET', 'POST'])
def save_route():
    body = request.get_json()
    print("body =>", body)
    user_commands = Commands()
    user_commands.selected_commands = f'{body}'
    user_commands.user = browser_session['user_id']
    db.session.add(user_commands)
    db.session.commit()    
    return { "route" : user_commands.to_dict() }, 200
# TODO load all routes so the user can save multiple and select anyone
# route to load the ""COMMANDS"" save route
@app.route("/load_route_from_selected_commands")
def load_route_from_selected_commands_func():  
    all_routes = Commands.query.filter(Commands.user == browser_session['user_id']).all()
    # This line return the last route, so the user can just save a new route, and 
    # the most recent route will always be loaded.
    return {"route": ast.literal_eval(all_routes[-1].selected_commands) }, 201

 
# save the flight ""MARKERS"" to the database
@app.route("/save_route_to_marker_commands", methods = ['POST'])
def save_route_to_marker_commands():
    body = request.get_json()
    print(body)   
    active_user = User.query.get(browser_session['user_id'])
    new_marker_route = Commands(user = active_user.id, marker_commands = f'{body}') 
    db.session.add(new_marker_route)
    db.session.commit()
    return {'body' : body}, 200
# TODO load all routes so the user can save multiple and select anyone
# route to load the ""MARKERS"" save route
@app.route("/load_route_from_marker_commands")
def load_route_from_marker_commands_func():
    already_exisitng_route = Commands.query.filter(Commands.user == browser_session['user_id']).all()
    return {"route" : ast.literal_eval(already_exisitng_route[-1].marker_commands) }, 200


# this will return all the routes that belong to the active user
@app.route("/load_all_marker_routes")
def load_all_marker_routes():
    all_marker_routes = Commands.query.filter(Commands.user == browser_session['user_id']).all()
    print(list(all_marker_routes))
    marker_routes_ready_for_json = []
    for route in all_marker_routes:
        marker_routes_ready_for_json.append(ast.literal_eval(route.marker_commands)) 
    print(marker_routes_ready_for_json)
    print()
    return {"routes" : marker_routes_ready_for_json}, 200
            

# default route    
@app.route("/")
def default_route():
    return make_response(jsonify({"default" : "route"}), 200)
 

# route to arm the drone by running the "arm.py" file on the raspi
@app.route("/armDrone", methods = ['GET'])   
def arm_drone():
    # some set-up stuff to enable a ssh connection
    client.load_host_keys("/home/eli_moshe/.ssh/known_hosts")   
    client.set_missing_host_key_policy(AutoAddPolicy())
    # the actual connection the the raspi
    client.connect('192.168.63.245', username= 'pi', password= 'moshe')
    # the commands to happen on the raspi
    stdin, stdout, stderr = client.exec_command('hostname')
    print(f'Host-Name: {stdout.read().decode("utf8")}')
    stdin, stdout, stderr = client.exec_command('cd learning; python arm.py')
    # some prints so we can know whats happening
    print(f'STDOUT: {stdout.read().decode("utf8")}')
    print(f'STDERR: {stderr.read().decode("utf8")}')
    print(f'RETURN CODE: {stdout.channel.recv_exit_status()}')
    # closing all files and the ssh shell so they doesn't hang open
    stdin.close()
    stdout.close()
    stderr.close()
    client.close()
    return make_response(jsonify({"RETURN CODE ":stdout.channel.recv_exit_status()}), 200)



#  route to arm the drone by running mavproxy.py on the raspi
@app.route("/mavproxy", methods = ['GET', 'POST'])
def mavproxy():   
    # some set-up stuff to enable a ssh connection
    client.load_host_keys("/home/eli_moshe/.ssh/known_hosts")
    client.set_missing_host_key_policy(AutoAddPolicy())
    # the actual connection the the raspi
    client.connect('192.168.63.245', username = 'pi', password= 'moshe')
    # the commands to happen on the raspi
    stdin, stdout, stderr = client.exec_command('hostname')
    print(f'Host-Name: {stdout.read().decode("utf8")}')
    stdin, stdout, stderr = client.exec_command('python ./.local/bin/mavproxy.py;')

    stdin.write("arm throttle\n;")
    sleep(2)
    stdin.write("mode guided")
    sleep(1)
    stdin.write("takeoff 1")
    sleep(1)
        
    # some prints so we can know whats happening
    print(f'STDOUT: {stdout.read().decode("utf8")}')
    print(f'STDERR: {stderr.read().decode("utf8")}')
    print(f'RETURN CODE: {stdout.channel.recv_exit_status()}')
    # closing all files and the ssh shell so they doesn't hang open
    stdin.close()
    stdout.close()
    stderr.close()
    client.close()
    return make_response(jsonify({"RETURN CODE ":stdout.channel.recv_exit_status()}), 200)

   
@app.route("/mavproxy_2", methods = ['GET', 'POST', 'PATCH'])
def mavproxy_2():
    body = request.get_json()
    print(body)
    body.pop(0)   
    # the dictionary for fields to update in the db
    commands_for_db = {
     'takeoff_drone()' : 'meters_vertical',  
     'move_right()': 'meters_horizontal',
     'move_left()': 'meters_horizontal',
     'move_front()':'meters_horizontal',
     'move_up()': 'meters_vertical',
     'move_down()': 'meters_vertical',
     'move_back()': 'meters_horizontal',
    }
    # finds the current user
    current_user = User.query.get(browser_session['user_id'])

    current_user.attempted_flights += 1

    numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    false_functions  = ['arm_drone()', 'undefined()', 'loiter_time()', 'set_yaw()', 'take_picture()','land_drone()']
    for dictionary in body:

        for command, function in dictionary.items():
            if function in false_functions:
                print(f'function "{function}" not in commands_for_db')
            else:
                actual_function = ''  
                input = ''    
                for letter in str(function):
                    # print("letter: ", letter)
                    if letter in numbers:
                        input += letter
                    else:   
                        actual_function += letter 

                print("actual_function: ", actual_function)
                print("input: ", input) 

                # i love this, i hope this works 
                field = commands_for_db[actual_function]  
                current_value = getattr(current_user, field)          
                setattr(current_user, field, current_value + int(input))              
                # this is where i want to update the db with the input of the user    


    




















        current_user.total_commands +=1
        # current_command = commands_for_db[command]
        # current_user.current_command =+1
        # print(dictionary)

    db.session.commit()    

    # # some set-up stuff to enable a ssh connection
    # client.load_host_keys("/home/eli_moshe/.ssh/known_hosts")
    # client.set_missing_host_key_policy(AutoAddPolicy())
    # # the actual connection the the raspi
    # client.connect(f'{body[0]["IP"]}', username= 'pi', password= 'moshe')
    # body.pop(0)
    # print(body)
    # # the commands to happen on the raspi
    # stdin, stdout, stderr = client.exec_command('hostname')
    # print(f'Host-Name: {stdout.read().decode("utf8")}')
    # stdin, stdout, stderr = client.exec_command(f'cd learning ; python front_end.py "{body}"')
    # # some prints so we can know whats happening
    # print(f'STDOUT: {stdout.read().decode("utf8")}')
    # print(f'STDERR: {stderr.read().decode("utf8")}')
    # print(f'RETURN CODE: {stdout.channel.recv_exit_status()}')
    # # closing all files and the ssh shell so they doesn't hang open
    # stdin.close()
    # stdout.close()
    # stderr.close()
    # client.close()
    # return make_response(jsonify({"RETURN CODE ":stdout.channel.recv_exit_status()}), 200)
    return body, 200


@app.route("/mavproxy_3", methods = ['GET', 'POST'])
def mavproxy_3():
    body = request.get_json()
    # removes 'python front_end.py'
    body.pop(0)
    # body is a string, this converts it to a python list
    # after_ast = ast.literal_eval(body[0])
    # removes the 'IP Address' dictionary
    # after_ast.pop(0)


    # all functions that can be selected from the front end drop down menu
    def arm_drone():
        print("arm_drone function")      

    def takeoff_drone(height):
        print("takeoff_drone function")

    def land_drone():
        print("land_drone function")

    def take_picture():
        print("take_picture function")

    def move_front(Vx):
        print("move_front function")

    def move_back(Vx):
        print("move_back function")

    def move_right(Vy):
        print("move_right function")

    def move_left(Vy):
        print("move_left function")

    def move_up(Vz):
        print("move_up function")

    def move_down(Vz):
        print("move_down function")

    # Yes, this actually does work
    def second_execute_commands(body):
        # 'body' is the list, 'dictionary' is the each {'command' : 'arbitrary_function(argument)'} 
        for dictionary in body:
            print("each dictionary =>", dictionary)
            exec(dictionary['command'])


    print(body)
    print("type(body) =>", type(body))        
    second_execute_commands(body)

    print("the script is over") 
    return { 'body' : body }, 200  

# route for the flight with the google map coordinates
@app.route("/map", methods = ['GET', 'POST'])
def map():
    body = request.get_json()
    del body['ip']
    # # some set-up stuff to enable a ssh connection
    # client.load_host_keys("/home/eli_moshe/.ssh/known_hosts")
    # client.set_missing_host_key_policy(AutoAddPolicy())
    # # the actual connection the the raspi
    # client.connect({body['ip']}, username= 'pi', password= 'moshe')
    # del body['ip']
    # print(body)
    # # the commands to happen on the raspi
    # stdin, stdout, stderr = client.exec_command('hostname')
    # print(f'Host-Name: {stdout.read().decode("utf8")}')
    # stdin, stdout, stderr = client.exec_command(f'cd learning ; python map_front_end "{body}"')
    # # some prints so we can know whats happening
    # print(f'STDOUT: {stdout.read().decode("utf8")}')
    # print(f'STDERR: {stderr.read().decode("utf8")}')
    # print(f'RETURN CODE: {stdout.channel.recv_exit_status()}')
    # # closing all files and the ssh shell so they doesn't hang open
    # stdin.close()
    # stdout.close()
    # stderr.close()
    # client.close()
    # return make_response(jsonify({"RETURN CODE ":stdout.channel.recv_exit_status()}), 200)
    return body, 201





#  route for all users
@app.route("/users", methods = ['GET', 'POST'] )
def get_all_users():
    # GET for all users
    if request.method == 'GET':
        all_users = User.query.all()
        users_dict = [user.to_dict() for user in all_users]
        return make_response(jsonify(users_dict), 200)
    # POST for all users
    elif request.method == 'POST':
        new_info = request.get_json()
        new_user = User()
        for key, value in new_info.items():
            setattr(new_user, key, value)
        db.session.add(new_user)
        db.sesion.commit()
        return make_response(jsonify(new_user.to_dict()), 201)    
    
# route for USER by ID
@app.route("/users/<id>", methods = ['GET', 'PATCH', 'DELETE'])
def get_user_by_id(id):
    user_exists = User.query.get(id)
    if not user_exists:
        return {"status": "user not found"}, 404
    elif user_exists:
        if request.method == 'GET':
            return user_exists.to_dict(), 200
        if request.method == 'PATCH':
            body = request.get_json()
            for key, value in body.items():
                setattr(user_exists, key, value)
            db.session.add(user_exists)
            db.session.commit()
            return user_exists.to_dict(), 201    
        if request.method == 'DELETE':
            db.session.delete(user_exists)
            db.session.commit()
            return {"status" : "user deleted"}, 200
            
  
#route for all commands
@app.route("/commands", methods = ['GET', 'POST'])
def all_commands():
    # GET for all commands
    if request.method == 'GET':   
        commands = Commands.query.all()
        commands_to_dict = [cmd.to_dict() for cmd in commands]
        return {"status, all commands":commands_to_dict}, 200
    # POST for all commands
    elif request.method == 'POST':
        body = request.get_json()
        new_command = Commands()
        for key, value in body.items():
            setattr(new_command, key, value)
        db.session.add(new_command)
        db.session.commit()
        return {"status, new command": new_command.to_dict()}, 201    
            
# route for command by ID
@app.route("/commands/<id>", methods = ['GET', 'PATCH', 'DELETE'])
def command_by_id(id):
    command_exists = Commands.query.get(id)
    if not command_exists:
        return {"status":"command not found"}, 404
    elif command_exists:
        # GET for each command
        if request.method == 'GET': 
            return {"commnd found":command_exists.to_dict()}, 200
        # PATCH for each command  
        if request.method == 'PATCH':
            body = request.get_json()
            for key, value in body.items():
                setattr(command_exists, key, value)
            db.session.add(command_exists)
            db.session.commit()
            return {"status, updated correctly": command_exists.to_dict()}, 201
        # DELETE for each command
        if request.method == 'DELETE':
            db.session.delete(command_exists)
            db.session.commit()
            return {"status":"command deleted"}, 200