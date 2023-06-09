import { useState } from "react"

export default function Form({ dictionary, index, handleFormChange, deleteCommand }) {

    return (
        <div className="Each-command-form">
            <label> Command # {index+1}: </label>
            <select id="firstSelect"
                    name="input"
                    value={dictionary.input}
                    onChange={ (e) => handleFormChange(e, index)}>
                <option>Select Command</option>   
                <option>Arm Drone: Leave Input Field Blank</option> 
                <option>Takeoff: In Meters</option>    
                <option>Fly Right: In Meters</option>
                <option>Fly Left: In Meters</option>
                <option>Fly Front: In Meters</option>
                <option>Fly Up: In Meters</option>
                <option>Fly Down: In Meters</option>
                <option>Fly Back: In Meters</option>
                <option>Hover In One Place: In Seconds</option>
                <option>Yaw: In Relative Degrees. Positive = CW, Negative = CCW</option>
                <option>Take Picture: Leave Input Field Blank</option>
                <option>Land: Leave Input Field Blank</option>
            </select>   
            <input placeholder="Example: 10"
                    name="select"
                    value={dictionary.select}
                    onChange={ (e) => handleFormChange(e, index)}
                    type="number">
            </input>
            <button id="delete-command-button" style={{backgroundColor: 'red'}} onClick={ (e) => deleteCommand(index)}>DELETE COMMAND</button>
      </div>
    )
}