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
    while vehicle.is_armable!=True:
        print("Waiting for vehicle to become armable.")
        time.sleep(1)
    print("Vehicle is now armable.")
    print("") 

    vehicle.mode = VehicleMode("GUIDED")
    while vehicle.mode!="GUIDED":
        print("Waiting for drone to enter GUIDED mode.")
        time.sleep(1)
    print("Vehicle is now in GUIDED mode")

    vehicle.armed = True
    while vehicle.armed==False:
        print("Waiting for vehicle to be armed.")
        time.sleep(1)
    print("Look out! Drone is armed and the propellers are spinning!")

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