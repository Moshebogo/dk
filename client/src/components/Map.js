import { useState } from "react"
import Form from "./Form"

export default function Map() {


    const [state, setState] = useState([1, 2, 3])

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

    function handleClick(e) {
        setState(prev => [...state, state.length + 1])
    }


    function handleSubmit(e) {
        const formData = {
                     
        }


        fetch("/mavproxy_2", {
            method: 'POST',
            headers: {'Content-Type' : 'application/JSON'},
            body: JSON.stringify(formData)
        })
    }

    
    return (
        <div>
            <h1>Map Component</h1>
            <button onClick={ (e) => handleClick(e)}>Add Task</button>
            {state.map(element => {
        console.log(element)
       return <Form stateElement={element} setElement={element}/> 
    
    })}
         <input type="submit" value="Send Commands To Raspberrypi"></input>
        </div>
    )



    
}