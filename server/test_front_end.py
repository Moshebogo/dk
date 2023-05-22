import sys
import ast
import os
os.system("clear")
# the argument
body = sys.argv
# removes 'python front_end.py'
body.pop(0)
# body is a string, this converts it to a python list
after_ast = ast.literal_eval(body[0])
# removes the 'IP Address' dictionary
after_ast.pop(0)


# all functions that can be selected from the front end drop down menu
def arm_drone():
    print("arm_drone function")      

def takeoff_drone(height):
    print("takeoff_drone function")

def land_drone():
    print("land_drone function")

def take_picture():
    print("take_picture function")

def move_front(Vx):
    print("move_front function")

def move_back(Vx):
    print("move_back function")

def move_right(Vy):
    print("move_right function")

def move_left(Vy):
    print("move_left function")

def move_up(Vz):
    print("move_up function")

def move_down(Vz):
    print("move_down function")

# Yes, this actually does work
def second_execute_commands(body):
    # 'body' is the list, 'dictionary' is the each {'command' : 'arbitrary_function(argument)'} 
    for dictionary in body:
         exec(dictionary['command'])
   
        
second_execute_commands(after_ast)

print("the script is over")