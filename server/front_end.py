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


#####################   arming the drone   ###########################


def arm_and_takeoff(targetHeight):
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

    vehicle.simple_takeoff(targetHeight)
    time.sleep(5)
    return None           

arm_and_takeoff()

########################################################################

def move_front(Vx):
    move_front_msg = vehicle.message_factory.set_position_target_local_ned_encode(
    0,
    0, 0,
    mavutil.mavlink.MAV_FRAME_LOCAL_NED,
    0b0000111111111000,
    Vx, 0, 0,
    0, 0, 0,
    0, 0, 0,
    0, 0
    )
    vehicle.send_mavlink(move_front_msg)
    vehicle.flush()

def move_back(Vx):
    move_back_msg = vehicle.message_factory.set_position_target_local_ned_encode(
    0,
    0, 0,
    mavutil.mavlink.MAV_FRAME_LOCAL_NED,
    0b0000111111111000,
    -Vx, 0, 0,
    0, 0, 0,
    0, 0, 0,
    0, 0
    )
    vehicle.send_mavlink(move_back_msg)
    vehicle.flush()

def move_right(Vy):
    move_right_msg = vehicle.message_factory.set_position_target_local_ned_encode(
    0,
    0, 0,
    mavutil.mavlink.MAV_FRAME_LOCAL_NED,
    0b0000111111111000,
    0, Vy, 0,
    0, 0, 0,
    0, 0, 0,
    0, 0
    )
    vehicle.send_mavlink(move_right_msg)
    vehicle.flush()

def move_left(Vy):
    move_left_msg = vehicle.message_factory.set_position_target_local_ned_encode(
    0,
    0, 0,
    mavutil.mavlink.MAV_FRAME_LOCAL_NED,
    0b0000111111111000,
    0, -Vy, 0,
    0, 0, 0,
    0, 0, 0,
    0, 0
    )
    vehicle.send_mavlink(move_left_msg)
    vehicle.flush()

def move_up(Vz):
    move_up_msg = vehicle.message_factory.set_position_target_local_ned_encode(
    0,
    0, 0,
    mavutil.mavlink.MAV_FRAME_LOCAL_NED,
    0b0000111111111000,
    0, 0, -Vz,
    0, 0, 0,
    0, 0, 0,
    0, 0
    )
    vehicle.send_mavlink(move_up_msg)
    vehicle.flush()

def move_down(Vz):
    move_down_msg = vehicle.message_factory.set_position_target_local_ned_encode(
    0,
    0, 0,
    mavutil.mavlink.MAV_FRAME_LOCAL_NED,
    0b0000111111111000,
    0, 0, Vz,
    0, 0, 0,
    0, 0, 0,
    0, 0
    )
    vehicle.send_mavlink(move_down_msg)
    vehicle.flush()
    
# If I know how many commands are being passed through 
def execute_commands(arg1 = 'print("N\A")', arg2 = 'print("N\A")', arg3 = 'print("N\A")'):
    # execute first command
    exec(arg1)
    time.sleep(3)
    # executesecond command
    exec(arg2)
    time.sleep(3)
    # execute third command
    exec(arg3)
    time.sleep(3)


# I wonder if this will work
def second_execute_commands(*commands):
    for command in commands:
        exec(command())
        time.sleep(2)


execute_commands(sys.arg[1], sys.arg[2], sys.arg[3])


vehicle.mode = VehicleMode("LAND")

print("the script is over")