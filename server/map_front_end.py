import time
import os
import platform
import sys
import argparse

from dronekit import connect, VehicleMode, LocationGlobal, LocationGlobalRelative
from pymavlink import mavutil


#####################   connecting to the the drone   ###########################


vehicle = connect('/dev/ttyS0', baud=57600, wait_ready=True)
print( str(vehicle.system_status.state) )

#################################################################################


def arm_drone():
    print("vehicle mode: ", vehicle.mode, "vehicle system status-state: ", vehicle.system_status.state)

    vehicle.mode = VehicleMode("GUIDED")

    print("Is vehicle armable? ", vehicle.is_armable)
    while vehicle.armed==False:
        print("Waiting for vehicle to be armed.")
        vehicle.armed = True
        if vehicle.armed == True:
            break
        time.sleep(1)
    print("vehicle is now armed")

    time.sleep(1)

arm_drone()

########################  commands for the actual movement   ######################


def takeoff(altitude):
    arm_drone()
    vehicle.simple_takeoff(altitude)
    while True:
        print("Altitude: ", vehicle.location.global_relative_frame.alt)
        if vehicle.location.global_relative_frame.alt >= altitude *0.95:
            print("Target Alitutde Reached!")
            del body['takeOffAltitude']
            break

def go_to_coordinates(lat, lng):
    print(lat, lng)   
    target_location = LocationGlobalRelative(lat, lng)    
    vehicle.simple_goto(target_location) 
    current_location = vehicle.location.global_relative_frame
    print("current_location: ", current_location)
    while True:
        remaining_distance = get_location_metres()
       


body = sys.argv[1]

takeoff(body['takeOffAltitude'])    

for dictionary in body['markers']:
    print("going to ", dictionary)
    go_to_coordinates(dictionary['lat'], dictionary['lng'])

# safety measure in case no final land command is passed in
vehicle.mode = VehicleMode("LAND")

print("the script is over")