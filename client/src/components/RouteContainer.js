import { useState } from "react"
import Form from "./Form"
import RouteDetails from "./RouteDetails"

export default function RouteContainer({ handleLogOut }) {

    // the basic setup for the controlled form
    const form = {'input': '', 'select': ''}
    const [stateIP, setIP] = useState("")
    const [stateCommands, setCommands] = useState( [ form ] ) 

// dictionary for the "finalCommands" dictionary
const commands = {
    "Arm Drone: Leave Input Field Blank": "arm_drone",
    "Takeoff: In Meters": "takeoff_drone",
    "Fly Right: In Meters": "move_right",
    "Fly Left: In Meters": "move_left",
    "Fly Front: In Meters": "move_front",
    "Fly Up: In Meters": "move_up",
    "Fly Down: In Meters": "move_down",
    "Fly Back: In Meters": "move_back",
    "Hover In One Place: In Seconds": "loiter_time",
    "Take Picture: Leave Input Field Blank": "take_picture",
    "Yaw: In Relative Degrees. Positive = CW, Negative = CCW": "set_yaw", 
    "Land: Leave Input Field Blank": "land_drone"
    }

 // starts blank, it will get filled in the "createFinalDictionary" function
 const finalCommands = []  
     
 // this combines the selected command with the numbered input into one string, and adds all the the "finalCommands" array
 function createFinalDictionary() {
    finalCommands.push({'IP': stateIP}          )
     stateCommands.map((object, index) => {
         finalCommands.push({'command': commands[object.input] + '(' + object.select + ')'})
        })
        setCommands( [ form ] )
}

// makes the form a controlled form, with "onChange"
function handleFormChange(e, index) {
    const data = [...stateCommands]
    data[index][e.target.name] = e.target.value
    setCommands(data)
}

// adds a form field for a new command
function addCommand(e) {
    setCommands(prev => [...stateCommands, form])
}

// delets a command form field
function deleteCommand(index){
   setCommands(prev => stateCommands.filter(command => stateCommands.indexOf(command) !== index))
}

// actual POST
let submitCounter = 1
function handleSubmit() {
    if(submitCounter === 0) {
        alert("Warning! Arming the drone will cause the propellers to spin at high speed! Please ensure the area is clear and click again! ")
        submitCounter ++
    } else if (submitCounter === 1) {
        createFinalDictionary()
        fetch("/mavproxy_2", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(finalCommands)}
        ).then(resp => resp.json())
         .then(data => {
                console.log(data)
                setIP("")
                // reset the counter so the alert can happen again
                submitCounter = 1
         }) 
    }
}

// function to save the route commands to the database
function saveRoute(e) {
    fetch("/save_route", {
        method: "POST",
        headers: {"Content-Type": 'application/json' },
        body : JSON.stringify(stateCommands)
    })
    .then(resp => resp.json())
    .then(data => {console.log(data)})
}

// function to query the database and load a save route
function loadRoute2(){
    return (<routeDetails />)
}
// function to vew flight details from database
function viewStats(e) {
    <RouteDetails />
}


function loadRoute(e){
    fetch("/loadRoute")
    .then(resp => resp.json())
    .then(data => {
        console.log(data.route)
        setCommands(data.route)
        console.log(stateCommands)
     })
}

function clearCommands(e) {
   setCommands([form])
   setIP("")
}

    return (
        // basic styling to make it easier to work with
       <div style={{'display' : 'grid', 'width' : '40%', 'margin' : 'auto', 'alignItems': 'center'}}>
       <button style={{'backgroundColor': 'green'}} onClick={ (e) => addCommand(e)}>ADD COMMAND</button>
       <div style={{'margin': '1%'}}>
            <label>Enter the IP addres of the drone: </label>
            <input type="text"
                    placeholder="ie: 192.168.63.245"
                    value={stateIP}
                    onChange={ (e) => setIP(e.target.value)}></input>
        </div>            
              {/* creates a controlled form, so every command can get it's own form and state */}
            {stateCommands.map((dictionary, index) => {
                return (
                    <div key={index} style={{'display':'grid', 'margin': 'auto', 'width': '50%', 'textAlign': 'center'}}>
                        <Form  handleFormChange={handleFormChange} dictionary={dictionary} index={index}   />
                        <button style={{'backgroundColor': 'red'}} onClick={ (e) => deleteCommand(index)}>DELETE COMMAND</button>
                    </div>
                )})
            }
            <button style={{'margin': '2%'}} onClick={ (e) => handleSubmit(e)}>SENDS COMMANDS TO RASPBERRYPI</button>
            <button style={{'margin': '2%'}} onClick={ (e) => saveRoute(e) }>Save Route</button>
            <button style={{'margin': '2%'}} onClick={ (e) => loadRoute(e)}>Load Saved Route</button>
            <button style={{'margin': '2%'}} onClick={ (e) => clearCommands(e)}>Clear Commands</button>
            <button style={{'margin': '2%'}} onClick={ (e) => viewStats(e)}>View FLight Stats </button>
            <div>
              <button onClick={ (e) => handleLogOut(e)}>Log Out</button>
            </div>  
       </div>
    )
}       