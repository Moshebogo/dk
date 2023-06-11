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


############################  arming the drone  #################################


def arm_drone():
    print("vehicle mode: ", vehicle.mode, "vehicle system status-state: ", vehicle.system_status.state)

    vehicle.mode = VehicleMode("LOITER")

    print("Is vehicle armable? ", vehicle.is_armable)
    while vehicle.armed==False:
        print("Waiting for vehicle to be armed.")
        vehicle.armed = True
        if vehicle.armed == True:
            break
        time.sleep(1)
    print("vehicle is now armed")

    time.sleep(1)
    return None           



######################### all other possible drone functions ########################





def takeoff_drone(altitude):
    vehicle.simple_takeoff(altitude)
    while True:
        print("Altitude: ", vehicle.location.global_relative_frame.alt)
        if vehicle.location.global_relative_frame.alt >= altitude *0.95:
            print("Target Alitutde Reached!")
            break   

def land_drone():
    vehicle.mode = VehicleMode("LAND")
    time.sleep(1)

def take_picture():
    print("take_picture function")
    # TODO mavlink message to ake a picture
    pass



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
    
# this only works If I know how many commands are being passed through 
def execute_commands(arg1 = 'print("N\A")', arg2 = 'print("N\A")', arg3 = 'print("N\A")'):
    # execute first command
    exec(   )
    print(arg1)
    time.sleep(2)
    # executesecond command
    exec(arg2)
    print(arg2)
    time.sleep(2)
    # execute third command
    exec(arg3)
    print(arg3)
    time.sleep(2)


# I wonder if this will work
def second_execute_commands(body):
    print("body => ", body)
    for dictionary in body:
        #  commented out until the prints actually print as expected
        #  exec(dictionary['command'])
        print("each dictionary => ", dictionary)
        print("each actual command => ", dictionary['command'])

second_execute_commands(sys.argv[1])

# safety measure in case no final land command is passed in
vehicle.mode = VehicleMode("LAND")

print("the script is over")