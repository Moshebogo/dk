

const a = 5
export default function Buttons() {


// route for arming with arm.py 
let armDCounter = 0
function armDrone(e){
  if (armDCounter === 0 ) {
    alert("Warning! Arming the drone will cause the propellers to spin at high speed! Please ensure the area is clear and click again! ")
    armDCounter ++
  } else if (armDCounter === 1) {
  armDCounter ++
  console.log(`Arm Drone Clicked ${armDCounter} times.`)
  fetch("http://localhost:5000/armDrone")
  .then(resp => resp.json())
  .then(data => console.log(data))
  .catch(error => console.log('error: ', error))
  armDCounter = 0
  }
}

// route for arming with mavproxy.py
let mavPCounter = 0
function mavproxy(e) {
  if (mavPCounter === 0){
    alert("Warning! Arming the drone will cause the propellers to spin at high speed! Please ensure the area is clear and click again! ")
    mavPCounter ++
  } else if (mavPCounter === 1) {
  console.log(`mavproxy was clicked ${mavPCounter} times.`)
  fetch("http://localhost:5000/mavproxy")
  .then(resp => resp.json())
  .then(data => console.log(data))
  .catch(error => console.log('error: ', error))
  mavPCounter = 0
  }
}


  return (
    <div id='mainButtons'>
      <button onClick={ (e) => armDrone(e)} id='armDrone'>ARM DRONE</button>
      <button onClick={ (e) => mavproxy(e)} id='mavproxy'>MAV PROXY</button>
    </div>
    )
}
