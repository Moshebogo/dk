from paramiko import SSHClient, AutoAddPolicy



client = SSHClient()



# some set-up stuff to enable a ssh connection
client.load_host_keys("/home/eli_moshe/.ssh/known_hosts")
client.set_missing_host_key_policy(AutoAddPolicy())
# the actual connection the the raspi
client.connect('192.168.159.245', username= 'pi', password= 'moshe')
# the commands to happen on the raspi
stdin, stdout, stderr = client.exec_command('hostname')
print(f'Host-Name: {stdout.read().decode("utf8")}')
stdin, stdout, stderr = client.exec_command('python ./.local/bin/mavproxy.py; arm throttle')
stdin.write("arm throttle\n; set requireexit True\n; exit\n;")
# some prints so we can know whats happening
print(f'STDOUT: {stdout.read().decode("utf8")}')
print(f'STDERR: {stderr.read().decode("utf8")}')
print(f'RETURN CODE: {stdout.channel.recv_exit_status()}')
# closing all files and the ssh shell so they doesn't hang open
stdin.close()
stdout.close()
stderr.close()
client.close()
