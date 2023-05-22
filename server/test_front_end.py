import sys
import ast
import os
import time

from dronekit import connect, VehicleMode, LocationGlobal, LocationGlobalRelative
from pymavlink import mavutil


#####################   connecting to the the drone   ###########################


vehicle = connect('/dev/ttyS0', baud=57600, wait_ready=True)
print( str(vehicle.system_status.state) )


############## converting the argument to a usable python list###################
os.system("clear")
# the argument
body = sys.argv
# removes 'python front_end.py'
body.pop(0)
# body is a string, this converts it to a python list
after_ast = ast.literal_eval(body[0])


###### All functions that can be selected from the front end drop down menu #####


def arm_drone(*param):
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
      

def takeoff_drone(height):
    print("takeoff_drone function")
    vehicle.simple_takeoff(height)
    time.sleep(2)    

def land_drone(*param):
    print("land_drone function")
    vehicle.mode = VehicleMode("LAND")
    time.sleep(1)

def take_picture(*param):
    print("take_picture function")
    # TODO mavlink message to ake a picture

def set_yaw(param):
    print("set_yaw function")   
    # TODO actually implement the set yaw     

def move_front(Vx):
    print("move_front function")
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
    print("move_back function")
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
    print("move_right function")
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
    print("move_left function")
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
    print("move_up function")
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
    print("move_down function")
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

# Yes, this actually does work
def second_execute_commands(body):
    # 'body' is the list, 'dictionary' is the each {'command' : 'arbitrary_function(argument)'} 
    for dictionary in body:
         exec(dictionary['command'])
   
        
second_execute_commands(after_ast)

# safety measure in case no final land command is passed in
vehicle.mode = VehicleMode("LAND")

print("the script is over")