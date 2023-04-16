from paramiko import SSHClient, AutoAddPolicy
from flask import Flask, jsonify, make_response
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


app.route("/armDrone", methods = ['GET'])
def arm_drone():
    # instance of paramiko
    client = SSHClient()
    # some set-up stuff to enable a ssh connection
    client.load_host_keys("/home/eli_moshe/.ssh/known_hosts")
    client.set_missing_host_key_policy(AutoAddPolicy())
    # tye actual connection the the raspi
    client.connect('192.168.71.245', username= 'pi', password= 'moshe')
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
    return make_response(jsonify({"function": "arm drone"}), 200)
    # return make_response(jsonify({'function': 'arm drone'}), 200)

