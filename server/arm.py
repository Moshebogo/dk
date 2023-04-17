import time
import os
import platform
import sys

from dronekit import connect, VehicleMode, LocationGlobal, LocationGlobalRelative
from pymavlink import mavutil


#####################   connecting to the the drone   ###########################


vehicle = connect('/dev/ttyS0', baud=57600, wait_ready=True)
print( str(vehicle.system_status.state) )


#####################   arming the drone   ###########################


def arm():
    print("vehicle mode: ", vehicle.mode)
    # while vehicle.is_armable!=True:
    #     print("Waiting for vehicle to become armable.")
    #     time.sleep(1)
    # print("Vehicle is now armable.")
    # print("") 

    vehicle.mode = VehicleMode("STABILIZE")
    print("vehicle mode: ", vehicle.mode)
    while vehicle.mode!="GUIDED":
        print("Waiting for drone to enter GUIDED mode.")
        time.sleep(1)
    print("Vehicle is now in GUIDED mode")

    vehicle.armed = True
    print("vehicle armed: ", vehicle.armed)
    while vehicle.armed==False:
        print("Waiting for vehicle to be armed.")
        time.sleep(1)
    print("vehicle is now armed")


    return None           

arm()

########################################################################