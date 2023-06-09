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
    # verify the drone has reached the desired alt before calling the next function
    while True:
        print("Altitude: ", vehicle.location.global_relative_frame.alt)
        #Break and return from function just below target altitude.
        if vehicle.location.global_relative_frame.alt >= height * 0.95:
            print("Desired Altitude Reached!")
            break
    vehicle.mode = VehicleMode("LOITER")
    print("Vehicle mode is currently set to: ", vehicle.mode)
    time.sleep(1)

def loiter_time(time):
    print("loiter_time function")
    vehicle.mode = VehicleMode("LOITER")
    print("Vehicle mode is currently set to: ", vehicle.mode)
    time.sleep(time)            

def land_drone(*param):
    print("land_drone function")
    vehicle.mode = VehicleMode("LAND")
    time.sleep(1)

def take_picture(*param):
    print("take_picture function")
    # TODO mavlink message to ake a picture

def set_yaw(heading):
    print("set_yaw function") 
    # based on the user input, this decides if the drone should yaw cw or ccw
    if heading == 0:
        direction = 1
    elif heading > 0:
        direction = 1
    elif heading < 0:
        direction = -1
    # create the CONDITION_YAW command using command_long_encode()
    msg = vehicle.message_factory.command_long_encode(
        0, 0,       # target system, target component
        mavutil.mavlink.MAV_CMD_CONDITION_YAW, #command
        0,          #confirmation
        heading,    # param 1, yaw in degrees
        0,          # param 2, yaw speed deg/s
        direction,  # param 3, direction -1 ccw, 1 cw
        1,          # param 4, relative offset 1, absolute angle 0
        0, 0, 0)    # param 5 ~ 7 not used
    # send command to vehicle
    vehicle.send_mavlink(msg)    

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

# Yes, this actually does work
def second_execute_commands(body):
    # 'body' is the list, 'dictionary' is the each {'command' : 'arbitrary_function(argument)'} 
    for dictionary in body:
         exec(dictionary['command'])
   
        
second_execute_commands(after_ast)

# safety measure in case no final land command is passed in
vehicle.mode = VehicleMode("LAND")

print("the script is over")


################################### for testing #################################


vehicle.cond



