import { useState } from "react"

export default function Form({element }) {

    const [stateSelect, setStateSelect] = useState("")
    const [stateInput, setStateInput] = useState("")

    
    return (
        <div>
            <label>Command: {element} After Takeoff: </label>
            <select id="firstSelect"
                    value={stateSelect}
                    onChange={ (e) => setStateSelect(e.target.value)}>
                <option>Select Command</option>    
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
                value={stateInput}
                onChange={ (e) => setStateInput(e.target.value)}
                type="number">
            </input>
      </div>
    )
}