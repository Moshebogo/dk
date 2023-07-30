import { useState } from "react"
import { confirmAlert } from 'react-confirm-alert'
import Form from "./Form.js"

export default function RouteContainer({ handleLogOut, createdUsername, checkCookie, oldUser, changeOptionsForFlight }) {


    
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
     
 // this combines the selected command with the numbered input into one string, and adds all to the "finalCommands" array
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
        body: JSON.stringify(finalCommands, )}
        ).then(resp => resp.json())
         .then(data => {
                checkCookie()
                console.log(data)
                setIP("")
                // reset the counter so the alert can happen again
                submitCounter = 1
         }) 
    }
}

// deletes the account of the user that is logged in
function deleteAccount(e) {
    if (window.confirm(`    Are you sure you want to delete your account?
    This action is permanent and can not be undone.`))
    {
    fetch("/delete_account")
    .then(resp => resp.json())
    .then(returnedData => 
        {
        checkCookie()
        // console.log(returnedData)
        }
    )
    }

}

// function to save the route commands to the database
function saveRoute(e) {
    fetch("/save_route_to_selected_commands", {
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
    // <RouteDetails />
}

// TODO load all routes so the user can save multiple and select anyone
function loadRoute(e){
    fetch("/load_route_from_selected_commands")
    .then(resp => resp.json())
    .then(data => {
        console.log(data.route)
        setCommands(data.route)
        console.log(stateCommands)
     })
}

// clears the commands and IPAdress that the user choose
function clearCommands(e) {
   setCommands([form])
   setIP("")
}
 
// allowes the entire dic to 'disapear'


    return (
        // basic styling to make it easier to work with
    <div >
       <div className="generalFlex">

       <svg id="butonforShowNameForSavedRoute" onClick={changeOptionsForFlight} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                </svg>

       {/* style={{'display' : 'grid', 'width' : '40%', 'margin' : 'auto', 'alignItems': 'center'}} */}
       <h1>{oldUser ? `Welcome Back ${createdUsername} !` : `Welcome ${createdUsername} !` }</h1>
       <button onClick={ (e) => addCommand(e)} style={{backgroundColor: 'green'}}>ADD COMMAND</button>
       <div className="ip-for-select">
            <label>Enter the IP addres of the drone: </label>
            <input type="text"
                    placeholder="ie: 192.168.63.245"
                    value={stateIP}
                    onChange={ (e) => setIP(e.target.value)}></input>
        </div>            
              {/* creates a controlled form, so every command can get it's own form and state */}
            {stateCommands.map((dictionary, index) => {
                return (
                    <div key={index} className="eachForm">
                        <Form deleteCommand={deleteCommand} handleFormChange={handleFormChange} dictionary={dictionary} index={index}   />
                    </div>
                )})
            }
            <button  onClick={ (e) => handleSubmit(e)} style={{backgroundColor: 'green'}}>SENDS COMMANDS TO RASPBERRYPI</button>
            <button  onClick={ (e) => saveRoute(e)}                                      >Save Route</button>
            <button  onClick={ (e) => loadRoute(e)}                                      >Load Saved Route</button>
            <button  onClick={ (e) => clearCommands(e)}                                  >Clear Commands</button>
            <button  onClick={ (e) => viewStats(e)}                                      >View Flight Stats </button>
            <button  onClick={ (e) => deleteAccount(e)} style={{backgroundColor: 'red'}} >Delete My Account</button>
            <button  onClick={ (e) => handleLogOut(e)}  style={{height: '2rem', fontSize: 'large'}}         >Log Out</button>
       </div>
    </div>  
    )
}       