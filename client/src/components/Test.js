import { useState } from "react"
import Form from "./Form"

export default function Test() {

    const form = {'input': '', 'select': ''}
    const [stateIP, setIP] = useState("")
    const [stateCommands, setCommands] = useState([
        form
    ]) 

// dictionary for the "finalCommands" dictionary
const commands = {
    "Takeoff: In Meters": "takeoff",
    "Fly Right: In Meters": "move_right",
    "Fly Left: In Meters": "move_left",
    "Fly Front: In Meters": "move_front",
    "Fly Up: In Meters": "move_up",
    "Fly Down: In Meters": "move_down",
    "Fly Back: In Meters": "fly_back",
    "Take Picture: 1 Is Yes. 2 Is No": "module load message message COMMAND_LONG 0 0 203 0 0 0 0 0 1 0 0",
    "Yaw: In Relative Degrees": "setyaw" 
    }

 const finalCommands = []  
    

 function createFinalDictionary() {
    finalCommands.push({'IP': stateIP}          )
     stateCommands.map((object, index) => {
         finalCommands.push({'command': commands[object.input] + '(' + object.select + ')'})
        })
        setCommands([form])
}

function handleFormChange(e, index) {
    const data = [...stateCommands]
    data[index][e.target.name] = e.target.value
    setCommands(data)
}

function addCommand(e) {
    setCommands(prev => [...stateCommands, form])
}

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
        console.log(    )
        fetch("/mavproxy_2", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(finalCommands)
    })
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
        // reset the counter so the alert can happen again
        submitCounter = 1
    })
    }
}



    return (
       <div style={{'display' : 'grid', 'width' : '40%', 'margin' : 'auto'}}>
       <button onClick={ (e) => addCommand(e)}>ADD COMMAND</button>
       <label>Enter the IP addres of the drone: </label>
       <input type="text"
              placeholder="ie: 192.168.63.245"
              value={stateIP}
              onChange={ (e) => setIP(e.target.value)}></input>
            {stateCommands.map((dictionary, index) => {
                return (
                    <div>
                        <Form key={index} handleFormChange={handleFormChange} dictionary={dictionary} index={index}   />
                        <button onClick={ (e) => deleteCommand(index)}>DELETE COMMAND</button>
                    </div>
                )
            })}
            <button onClick={(e) =>handleSubmit(e)}>SENDS COMMANDS TO RASPI</button>
       </div>
    )
}   