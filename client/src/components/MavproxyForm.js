import { useState } from "react"

export default function MavproxyForm() {
// state for the ip addres
const [stateIP, setIP] = useState("")

// state for 1st selection
const [stateFirstSelect, setFirstSelect] = useState("")
const [stateFirstInput, setFirstInput] = useState("")

// state for 1st selection
const [stateSecondSelect, setSecondSelect] = useState("")
const [stateSecondInput, setSecondInput] = useState("")

// state for 1st selection
const [stateThirdSelect, setThirdSelect] = useState("")
const [stateThirdInput, setThirdInput] = useState("")


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

// dictionary for the POST
const finalCommands = {
        "IP": stateIP,
        "first_command":  commands[stateFirstSelect]   + `(${stateFirstInput})`,
        "second_command": commands[stateSecondSelect]  + `(${stateSecondInput})`,
        "third_command":  commands[stateThirdSelect]   + `(${stateThirdInput})`
}    


// actual POST
let submitCounter = 0
function handleSubmit(e) {
    e.preventDefault()
    console.log("finalCommands: ", finalCommands)
    if (submitCounter === 0 ) {
        alert("Warning! Arming the drone will cause the propellers to spin at high speed! Please ensure the area is clear and click again! ")
        submitCounter ++
    } else if (submitCounter === 1) {
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
        // reset all the state fields to reset the form
        setIP("")
        setFirstSelect("")
        setFirstInput("")
        setSecondSelect("")
        setSecondInput("")
        setThirdSelect("")
        setThirdInput("")
        // reset the counter so the alert can happen again
        submitCounter = 0
    })
    }
}

    return (
        <div>
  
            <h2 id="discription">
    This menu simplifies the proccess of flying your personal drone.
    Simply enter the IP Address of your drone and select a list of commands from the dropdown. Happy Flying!
            </h2>

            <form id="form" onSubmit={ (e) => handleSubmit(e)}>
            

                              {/* First */}
                <label>IP address of drone: </label>
                <input value={stateIP}
                       onChange={ (e) => setIP(e.target.value)}
                       type="text"
                       placeholder="Example: 192.168.20.245">
                </input>

                <label>First Command After Takeoff: </label>
                <select id="firstSelect"
                        value={stateFirstSelect}
                        onChange={ (e) => setFirstSelect(e.target.value)}>
                    <option>Takeoff: In Meters</option>    
                    <option>Fly Right: In Meters</option>
                    <option>Fly Left: In Meters</option>
                    <option>Fly Front: In Meters</option>
                    <option>Fly Up: In Meters</option>
                    <option>Fly Down: In Meters</option>
                    <option>Fly Back: In Meters</option>
                    <option>Yaw: In Relative Degrees</option>
                    <option>Take Picture: 1 Is Yes. 2 Is No</option>
                </select>   
                <input placeholder="Example: 10"
                       value={stateFirstInput}
                       onChange={ (e) => setFirstInput(e.target.value)}
                       type="number">
                </input>
                               {/* First */}



                               {/* Second */}
                <label>Second Command After Takeoff: </label>
                <select id="secondSelect"
                        value={stateSecondSelect}
                        onChange={ (e) => setSecondSelect(e.target.value)}>
                    <option>Takeoff: In Meters</option>     
                    <option>Fly Right: In Meters</option>
                    <option>Fly Left: In Meters</option>
                    <option>Fly Front: In Meters</option>
                    <option>Fly Up: In Meters</option>
                    <option>Fly Down: In Meters</option>
                    <option>Fly Back: In Meters</option>
                    <option>Yaw: In Relative Degrees</option>
                    <option>Take Picture: 1 Is Yes. 2 Is No</option>
                </select>
                <input placeholder="Example: 10"
                       value={stateSecondInput}
                       onChange={ (e) => setSecondInput(e.target.value)}
                       type="number">
                </input>
                                {/* Second */}
                

                                {/* Third  */}
                <label>Third Command After Takeoff: </label>
                <select id="thirdSelect"
                        value={stateThirdSelect}
                        onChange={ (e) => setThirdSelect(e.target.value)}>
                    <option>Takeoff: In Meters</option>     
                    <option>Fly Right: In Meters</option>
                    <option>Fly Left: In Meters</option>
                    <option>Fly Front: In Meters</option>
                    <option>Fly Up: In Meters</option>
                    <option>Fly Down: In Meters</option>
                    <option>Fly Back: In Meters</option>
                    <option>Yaw: In Relative Degrees</option>
                    <option>Take Picture: 1 Is Yes. 2 Is No</option>
                </select>
                <input placeholder="Example: 10"
                       value={stateThirdInput}
                       onChange={ (e) => setThirdInput(e.target.value)}
                       type="number">
                </input>
                               {/* Third  */}

                <input id="submitButton" type="submit" value="Send Commands To Raspberrypi"></input>
            </form>
        </div>
    )
}