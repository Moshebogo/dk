from dronekit import connect, VehicleMode, LocationGlobalRelative, APIException
import argparse

def connectMyCopter():

    # parser = argparse.ArgumentParser(description='commands')
    # parser.add_argument('--connect')
    # args = parser.parse_args()

    # connection_string = args.connect
    
    # if not connection_string:
    #     import dronekit_sitl
    #     sitl = dronekit_sitl.start_default()
    #     connection_string = sitl.connection_string()

    # print(connection_string)
    # vehicle = connect(connection_string)

    vehicle = connect('127.0.0.1:14550', wait_ready=True, heartbeat_timeout=10)

    return vehicle

connectMyCopter()