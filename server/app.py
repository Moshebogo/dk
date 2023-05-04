from paramiko import SSHClient, AutoAddPolicy
from flask_sqlalchemy import SQLAlchemy
from flask import Flask, jsonify, make_response, request, session as browser_session
from time import sleep
from models import app, db, User
import os

x = 3

# instance of paramiko
client = SSHClient()

# the secret key
app.secret_key = os.environ.get("SECRET_KEY")

#  the excluded endpoints
excluded_endpoints = ['login', 'logout']


# @app.before_request
# def before():
#     if request.endpoint in excluded_endpoints: 
#         pass
#     elif request.endpoint not in excluded_endpoints:
#         if "user_id" in browser_session:
#             pass
#         else:
#             return make_response(jsonify({"status" : "access forbidden"}), 401)

# route to login
@app.route("/registerLogin", methods = ['POST'])
def login():
    # gets the users login info
    user_info =  request.get_json()
    username = user_info.get("username")
    password = user_info.get("password")
    #  check if user actually exists
    user_exists = User.query.filter(User.username == username and User.password == password ).first()
    #  and is it does or does not
    if user_exists:
        # sets the cookie as the users id
        browser_session['user_id'] = user_exists.id
        return make_response(jsonify({"status" : "user indeed exists"}), 200)
    else:
        new_user = User(username = username, password = password)
        db.session.add(new_user)
        db.session.commit()
        the_new_user = User.query.filter(new_user.username == username and new_user.password == password ).first()
        browser_session['user_id'] = the_new_user.id
        return make_response(jsonify({"status" :f"new user: {user_info}"}), 200)

# TODO delete the cookie
@app.route("/logOut", methods=['DELETE'])
def logout():
    if "user_id" in browser_session:
        response = make_response("cookie removed")
        response.set_cookie("user_id", max_age=0)
        return response
    else: 
        return {"status" : "user not found"}, 404
     



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
    client.connect('192.168.146.245', username= 'pi', password= 'moshe')
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
    client.connect('192.168.146.245', username= 'pi', password= 'moshe')
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
    # some set-up stuff to enable a ssh connection
    client.load_host_keys("/home/eli_moshe/.ssh/known_hosts")
    client.set_missing_host_key_policy(AutoAddPolicy())
    # the actual connection the the raspi
    client.connect(f'{body["IP"]}', username= 'pi', password= 'moshe')
    # the commands to happen on the raspi
    stdin, stdout, stderr = client.exec_command('hostname')
    print(f'Host-Name: {stdout.read().decode("utf8")}')
    stdin, stdout, stderr = client.exec_command('python ./.local/bin/mavproxy.py;')

    stdin.write("arm throttle\n;")
    sleep(2)


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


@app.route("/mavproxy_3", methods = ['GET'])
def mavproxy_3():
    body  = request.get_json()
    # some set-up stuff to enable a ssh connection
    client.load_host_keys("/home/eli_moshe/.ssh/known_hosts")
    client.set_missing_host_key_policy(AutoAddPolicy())
    # the actual connection the the raspi
    client.connect('192.168.105.245', username= 'pi', password= 'moshe')
    # the commands to happen on the raspi
    stdin, stdout, stderr = client.exec_command('hostname')
    print(f'Host-Name: {stdout.read().decode("utf8")}')
    # the actual commands to execute on the raspi
    stdin, stdout, stderr = client.exec_command(f'cd learning; python front_end.py -- {body["first_command"]} -- {body["second_command"]} -- {body["third_command"]}')
    # some prints so we can know whats happening
    print(f'STDOUT: {stdout.read().decode("utf8")}')
    print(f'STDERR: {stderr.read().decode("utf8")}')
    print(f'RETURN CODE: {stdout.channel.recv_exit_status()}')
    # closing all files and the ssh shell so they doesn't hang open
    stdin.close()
    stdout.close()
    stderr.close()
    client.close()
    # anything other than a 0 is a problem
    return make_response(jsonify({"RETURN CODE ":stdout.channel.recv_exit_status()}), 200)



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