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


def arm_and_takeoff(targetHeight):
    print("vehicle mode: ", vehicle.mode, "vehicle system status-state: ", vehicle.system_status.state)
    # while vehicle.is_armable!=True:
    #     print("Waiting for vehicle to become armable.")
    #     time.sleep(1)
    # print("Vehicle is now armable.")
    # print("") 

    # vehicle.mode = VehicleMode("GUIDED")
    # while vehicle.mode!="GUIDED":
    #     print("Waiting for drone to enter GUIDED mode.")
    #     time.sleep(1)
    # print("Vehicle is now in GUIDED mode")

    print("Is vehicle armable? ", vehicle.is_armable)
    while vehicle.armed==False:
        print("Waiting for vehicle to be armed.")
        vehicle.armed = True
        if vehicle.armed == True:
            break
        time.sleep(1)
    print("vehicle is now armed")

    vehicle.simple_takeoff(targetHeight)
    while True:
        current_altitude = vehicle.location.global_relative_frame.alt
        print("Current Altitude: ", str(current_altitude) )
        if current_altitude >= .95*targetHeight:
            break
        time.sleep(1)

    return None           

arm_and_takeoff(1)

########################################################################