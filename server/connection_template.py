from dronekit import connect, VehicleMode, LocationGlobalRelative, APIException
import argparse
# import time
# import socket
# import pyception
# import math

def connectMyCopter():

    parser = argparse.ArgumentParser(description='commands')
    parser.add_argument('--connect')
    args = parser.parse_args()

    connection_string = args.connect

    if not connection_string:
        import dronekit_sitl
        sitl = dronekit_sitl.start_default()
        connection_string = sitl.connection_string()
        
    Vehicle = connect(connection_string, wait_ready=True)
    print(dronekit_sitl)

    return Vehicle

vehicle = connectMyCopter()