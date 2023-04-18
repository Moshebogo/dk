


export default function Buttons() {

let aDCounter = 0
function armDrone(e){
  aDCounter ++
  console.log(`Arm Drone Clicked ${aDCounter} times.`)
  fetch("http://localhost:5000/armDrone")
  .then(resp => resp.json())
  .then(data => console.log(data))
  .catch(error => console.log('error: ', error))
}
let mPCounter = 0
function mavproxy(e) {
  mPCounter ++
  console.log(`mavproxy was clicked ${mPCounter} times.`)
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
