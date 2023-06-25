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
        print("User already exists: ", user_exists.to_dict())
        # sets a cookie as the id of the existing user
        browser_session['user_id'] = user_exists.id  
        return user_exists.to_dict(), 200
    #  checks if username is already taken, 
    #  this will only run if the usernae was entered and  the password was incorrect
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
    else:
        # print(browser_session['user_id'])
        return {'status' : 'no user currently logged in'}, 404     

# deletes the cookie
@app.route("/logOut", methods=['DELETE'])
def logout():
    if "user_id" in browser_session:    
        browser_session.pop('user_id', default=None)
        return { "status" : "cookie deleted" }, 200
    else:
        return { "status" : "user not found" }, 404  

# save the flight commands to the database
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

# save the flight markers to the database
@app.route("/save_route_to_marker_commands", methods = ['POST'])
def save_route_to_marker_commands():
    body = request.get_json()
    active_user = User.query.get(browser_session['user_id'])
    print(active_user)
    return {'body' : body}, 200

# route to load the save route
@app.route("/load_route_from_selected_commands")
def load_route():  
    all_routes = Commands.query.filter(Commands.user == browser_session['user_id']).all()
    return {"route": ast.literal_eval(all_routes[-1].selected_commands) }, 201
               
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
    client.connect('192.168.63.245', username= 'pi', password= 'moshe')
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

   
@app.route("/mavproxy_2", methods = ['GET', 'POST'])
def mavproxy_2():
    body = request.get_json()
    print(body)
    # some set-up stuff to enable a ssh connection
    client.load_host_keys("/home/eli_moshe/.ssh/known_hosts")
    client.set_missing_host_key_policy(AutoAddPolicy())
    # the actual connection the the raspi
    client.connect(f'{body[0]["IP"]}', username= 'pi', password= 'moshe')
    body.pop(0)
    print(body)
    # the commands to happen on the raspi
    stdin, stdout, stderr = client.exec_command('hostname')
    print(f'Host-Name: {stdout.read().decode("utf8")}')
    stdin, stdout, stderr = client.exec_command(f'cd learning ; python front_end.py "{body}"')
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