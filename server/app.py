from paramiko import SSHClient, AutoAddPolicy
from flask_sqlalchemy import SQLAlchemy
from flask import Flask, jsonify, make_response, request, session as browser_session
from time import sleep
from models import app, db, User

# instance of paramiko
client = SSHClient()


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


app.secret_key = "DEFRGETHYJKHHGFDasdfghfd"


# default route
@app.route("/")
def default_route():
    return make_response(jsonify({"default" : "route"}), 200)

@app.route("/armDrone", methods = ['GET'])   
def arm_drone():
    # some set-up stuff to enable a ssh connection
    client.load_host_keys("/home/eli_moshe/.ssh/known_hosts")
    client.set_missing_host_key_policy(AutoAddPolicy())
    # the actual connection the the raspi
    client.connect('192.168.50.245', username= 'pi', password= 'moshe')
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




@app.route("/mavproxy", methods = ['GET', 'POST'])
def mavproxy():
    # some set-up stuff to enable a ssh connection
    client.load_host_keys("/home/eli_moshe/.ssh/known_hosts")
    client.set_missing_host_key_policy(AutoAddPolicy())
    # the actual connection the the raspi
    client.connect('192.168.50.245', username= 'pi', password= 'moshe')
    # the commands to happen on the raspi
    stdin, stdout, stderr = client.exec_command('hostname')
    print(f'Host-Name: {stdout.read().decode("utf8")}')
    stdin, stdout, stderr = client.exec_command('python ./.local/bin/mavproxy.py;')

    stdin.write("arm throttle\n;")
    sleep(3)
    stdin.write("mode guided")
    sleep(3)
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
    return make_response(jsonify({"RETURN CODE ":stdout.channel.recv_exit_status()}), 200)