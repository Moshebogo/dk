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

function changeOptionsForFlight() {
   setRemoveDiv("")
   setFlyWithDirect(false)
   setFlyWithMap(false)
}


  return (
  <div id={ darkMode ? 'darkMode' : null}>
    <BrowserRouter>
      <Header stateUser={stateUser} setDarkMode={setDarkMode} />
        <Routes>
            <Route path="/"                element={<Home setMarker={setMarker} stateUser={stateUser} />}/>
            <Route path="/testConnection"  element={<TestConnection />}/> 
            <Route path="/map"             element={<Map  markers={markers} setMarker={setMarker} />}/>
            <Route path="/savedroutes"     element={<SavedRoutes changeOptionsForFlight={changeOptionsForFlight} setFlyWithMap={setFlyWithMap} flyWithMap={flyWithMap} setFlyWithDirect={setFlyWithDirect} flyWithDirect={flyWithDirect} setRemoveDiv={setRemoveDiv} stateUser={stateUser} setUser={setUser} userData={userData} setUserData={setUserData} markers={markers} setMarker={setMarker}/>}/>
            <Route path="/mavproxyform"    element={<MavproxyForm />}/>   
            <Route path="/contact"         element={<Contact />}/>
        </Routes>
    </BrowserRouter>
  </div>   
  )
}














// import React from 'react';
// import { useState, useEffect } from 'react';
// import { GoogleLogin } from '@react-oauth/google';

// export default function App() {
//     const responseMessage = (response) => {
//         console.log(response);
//     };
//     const errorMessage = (error) => {
//         console.log(error);
//     };
//     return (
//         <div>
//             <h2>React Google Login</h2>
//             <br />
//             <br />
//             <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
//         </div>
//     )
// }