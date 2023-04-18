import { useState } from "react"

export default function MavproxyForm() {

const [stateFirstSelect, setFirstSelect] = useState("")
const [stateFirstInput, setFirstInput] = useState("")

const [stateSecondSelect, setSecondSelect] = useState("")
const [stateSecondInput, setSecondInput] = useState("")

const [stateThirdSelect, setThirdSelect] = useState("")
const [stateThirdInput, setThirdInput] = useState("")

const commands = {
    "Fly Right: In Meters": "velocity",
    "Fly Left: In Meters": "velocity",
    "Fly Front: In Meters": "velocity",
    "Fly Up: In Meters": "velocity",
    "Fly Down: In Meters": "velocity",
    "Fly Back: In Meters": "velocity",
    "Take Picture: 1 Is Yes. 2 Is No": "module load message message COMMAND_LONG 0 0 203 0 0 0 0 0 1 0 0",
    "Yaw: In Relative Degrees": "setyaw" 
    }



const finalCommands = {
        "first command": commands[stateFirstSelect]
}    



function handleSubmit(e) {
    e.preventDefault()
    console.log(e)
    // document.querySelector("#form").reset()

    // fetch("http://localhost:5000/mavproxy", 
    // 'method', 'POST'
    // 'headers' : 'application/json', {
    //     body: JSON.stringify(finalCommands)
    // })
    // .then(resp => resp.json())
    // .then(data => console.log(data))
    // .catch(error => console.log('error: ', error))

}

    return (
        <div>
            <form id="form" onSubmit={ (e) => handleSubmit(e)}>
            

                              {/* First */}
                <label>First Command After Takeoff: </label>
                <select id="firstSelect"
                        value={stateFirstSelect}
                        onChange={ (e) => setFirstSelect(e.target.value)}>
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

                <input type="submit" value="Send Commands To Mavproxy"></input>
            </form>
        </div>
    )
}