import '/home/eli_moshe/Development/code/dk/client/src/App.css';
import {useState} from "react"
import {  BrowserRouter, Routes, Route} from "react-router-dom"
import TestConnection from './TestConnection';
import MavproxyForm from './MavproxyForm';
import Header from './Header';
import Home from './Home';
import Map from './Map';
import SavedRoutes from './Routes';
import Contact from './Contact';
import Register from './Register';



export default  function App() {

const [darkMode, setDarkMode] = useState()  
const [stateUser, setUser] = useState(false)
const [userData, setUserData] = useState("")
// testing
const [markers, setMarker] = useState( [] )
// state ro remove to div with the 2 options when on one is picked
const [removeDiv, setRemoveDiv] = useState("")
const [flyWithDirect, setFlyWithDirect] = useState(false)
const [flyWithMap, setFlyWithMap] = useState(false)

// state to pass down to for Routes.js
const [createdUsername, setCreatedUsername] = useState("")
const [oldUser, setOldUser] = useState(false) 

function changeOptionsForFlight() {
   setRemoveDiv("")
   setFlyWithDirect(false)
   setFlyWithMap(false)
}

// test to see if i can keep it in app.js and pass it down 
function checkCookie(){
  fetch("/checkCookie")
  .then(resp => {
      resp.ok ? setUser(true) : setUser(false)
      return resp.json()
  })
  .then(returnedData => {
      // console.log(rweturnedData)
      setCreatedUsername(returnedData.username)
      setOldUser(returnedData.old_user)
      setUserData(returnedData)
   })
}


  return (
  <div id={ darkMode ? 'darkMode' : null}>
    <BrowserRouter>
      <Header stateUser={stateUser} setDarkMode={setDarkMode} />
        <Routes>
            <Route path="/"                element={<Home setMarker={setMarker} stateUser={stateUser} />}/>
            <Route path="/testConnection"  element={<TestConnection />}/> 
            <Route path="/register"        element={<Register checkCookie={checkCookie}/>}/>
            <Route path="/map"             element={<Map  markers={markers} setMarker={setMarker} />}/>
            <Route path="/savedroutes"     element={<SavedRoutes  checkCookie={checkCookie}
                                                                  oldUser={oldUser}
                                                                  createdUsername={createdUsername}
                                                                  setOldUser={setOldUser}
                                                                  setCreatedUsername={setCreatedUsername}
                                                                  changeOptionsForFlight={changeOptionsForFlight}
                                                                  setFlyWithMap={setFlyWithMap}
                                                                  flyWithMap={flyWithMap}                                                                    setFlyWithDirect={setFlyWithDirect}
                                                                  flyWithDirect={flyWithDirect}
                                                                  setRemoveDiv={setRemoveDiv}
                                                                  stateUser={stateUser}
                                                                  setUser={setUser}
                                                                  userData={userData}
                                                                  setUserData={setUserData}
                                                                  markers={markers}
                                                                  setMarker={setMarker}/>}/>
            <Route path="/mavproxyform"    element={<MavproxyForm />}/>   
            <Route path="/contact"         element={<Contact />}/>
        </Routes>
    </BrowserRouter>
  </div>   
  )
}