from paramiko import SSHClient, AutoAddPolicy
from flask import Flask, jsonify, make_response, request
from flask_cors import CORS

#  instance of flask 
app = Flask(__name__)
CORS(app)
# instance of paramiko
client = SSHClient()


@app.route("/armDrone", methods = ['GET'])
def arm_drone():
    # some set-up stuff to enable a ssh connection
    client.load_host_keys("/home/eli_moshe/.ssh/known_hosts")
    client.set_missing_host_key_policy(AutoAddPolicy())
    # tye actual connection the the raspi
    client.connect('192.168.105.245', username= 'pi', password= 'moshe')
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

# @app.route("/mavproxy", methods = ['GET'])
# def mavproxy():

#     # some set-up stuff to enable a ssh connection
#     client.load_host_keys("/home/eli_moshe/.ssh/known_hosts")
#     client.set_missing_host_key_policy(AutoAddPolicy())
#     # the actual connection the the raspi
#     client.connect('192.168.105.245', username= 'pi', password= 'moshe')
#     # the commands to happen on the raspi
#     stdin, stdout, stderr = client.exec_command('hostname')
#     print(f'Host-Name: {stdout.read().decode("utf8")}')
#     stdin, stdout, stderr = client.exec_command('python ./.local/bin/mavproxy.py;')

#     stdin.write("arm throttle\n;")

#     # some prints so we can know whats happening
#     print(f'STDOUT: {stdout.read().decode("utf8")}')
#     print(f'STDERR: {stderr.read().decode("utf8")}')
#     print(f'RETURN CODE: {stdout.channel.recv_exit_status()}')
#     # closing all files and the ssh shell so they doesn't hang open
#     stdin.close()
#     stdout.close()
#     stderr.close()
#     client.close()
#     return make_response(jsonify({"RETURN CODE ":stdout.channel.recv_exit_status()}), 200)

#     # return make_response(jsonify({"RETURN CODE ":"stdout.channel.recv_exit_status()"}), 200)


@app.route("/mavproxy2", methods = ['GET'])
def mavproxy():
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