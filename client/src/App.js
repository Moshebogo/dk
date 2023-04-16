import './App.css';

function App() {

function armDrone(e){
  fetch("http://localhost:5000/armDrone")
  .then(resp => resp.json())
  .then(data => console.log(data))
  .catch(error => console.log('error: ', error))
}

  return (
    <div id='mainButtons'>
     <button onClick={ (e) => armDrone(e)} id='armDrone'>ARM DRONE</button>
    </div>
    )
}

export default App;
