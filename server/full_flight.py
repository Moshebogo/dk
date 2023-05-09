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

    vehicle.mode = VehicleMode("GUIDED")
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
    # while True:
    #     current_altitude = vehicle.location.global_relative_frame.alt
    #     print("Current Altitude: ", str(current_altitude) )
    #     if current_altitude >= .95*targetHeight:
    #         break
    #     time.sleep(1)
    time.sleep(2)
    return None           

arm_and_takeoff(2)

########################################################################

def set_velocity(Vx, Vy, Vz):
    msg = vehicle.message_factory.set_position_target_local_ned_encode(
    0,
    0, 0,
    mavutil.mavlink.MAV_FRAME_LOCAL_NED,
    0b0000111111111000,
    Vx, Vy, Vz,
    0, 0, 0,
    0, 0, 0,
    0, 0
    )
    vehicle.send_mavlink(msg)
    vehicle.flush()


# move the drone forward
set_velocity(2, 0, 0)
time.sleep(4)
# move the drone right
set_velocity(0, 2, 0)
time.sleep(4)
# move the drone up
set_velocity(0, 0, -2)
time.sleep(4)
# move the drone down
set_velocity(0, 0, 2)
time.sleep(4)
# move the drone left
set_velocity(0, -2, 0)
time.sleep(4)
# move the drone back
set_velocity(-2, 0, 0)
time.sleep(2)

vehicle.mode = VehicleMode("LAND")

print("the script is over")