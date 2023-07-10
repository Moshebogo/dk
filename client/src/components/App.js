


import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

function App() {
    const responseMessage = (response) => {
        console.log(response);
    };
    const errorMessage = (error) => {
        console.log(error);
    };
    return (
        <div>
            <h2>React Google Login</h2>
            <br />
            <br />
            <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
        </div>
    )
}
export default App;


















// import '/home/eli_moshe/Development/code/dk/client/src/App.css';
// import {useState} from "react"
// import {  BrowserRouter, Routes, Route} from "react-router-dom"
// import TestConnection from './TestConnection';
// import MavproxyForm from './MavproxyForm';
// import Header from './Header';
// import Home from './Home';
// import Map from './Map';
// import SavedRoutes from './Routes';

// export default  function App() {

// const [stateUser, setUser] = useState(false)
// const [userData, setUserData] = useState("")
// // testing
// const [markers, setMarker] = useState( [] )


//   return (
//     <BrowserRouter>
//       <Header stateUser={stateUser}/>
//         <Routes>
//             <Route path="/"                element={<Home setMarker={setMarker} />}/>
//             <Route path="/testConnection"  element={<TestConnection />}/> 
//             <Route path="/map"             element={<Map markers={markers} setMarker={setMarker} />}/>
//             <Route path="/savedroutes"     element={<SavedRoutes stateUser={stateUser} setUser={setUser} userData={userData} setUserData={setUserData} />}/>
//             <Route path="/mavproxyform"    element={<MavproxyForm />}/>   
//         </Routes>
//     </BrowserRouter>   
//   )
// }