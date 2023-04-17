import './App.css';
import {useState} from "react"


function App() {

let counter = 0
function armDrone(e){
  counter ++
  console.log(`Arm Drone Clicked ${counter} times.`)
  fetch("http://localhost:5000/armDrone")
  .then(resp => resp.json())
  .then(data => console.log(data))
  .catch(error => console.log('error: ', error))
}

function mavproxy(e) {
  fetch("http://localhost:5000/mavproxy")
  .then(resp => resp.json())
  .then(data => console.log(data))
  .catch(error => console.log('error: ', error))
}

  return (
    <div id='mainButtons'>
     <button onClick={ (e) => armDrone(e)} id='armDrone'>ARM DRONE</button>
     <button onClick={ (e) => mavproxy(e)} id='mavproxy'>MAV PROXY</button>
    </div>
    )
}




export default App;
