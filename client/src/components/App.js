import '/home/eli_moshe/Development/code/dk/client/src/App.css';
import {useState} from "react"
import {  BrowserRouter, Routes, Route, Router} from "react-router-dom"
import Buttons from './buttons';
import MavproxyForm from './MavproxyForm';
import Register from './Register';
import Header from './Header';
import Home from './Home';
import Map from './Map';
import SavedRoutes from './SavedRoutes';

export default  function App() {

const [stateUser, setUser] = useState(false)

  return (
    <BrowserRouter>
      <Header stateUser={stateUser}/>
      <Routes>
           <Route path="/"             element={<Home />}/>
           <Route path="/register"     element={<Register stateUser={stateUser} setUser={setUser} />}/>   
           <Route path="/buttons"      element={<Buttons />}/> 
           <Route path="/map"          element={<Map/>}/>
           <Route path="/savedroutes"  element={<SavedRoutes />}/>
           <Route path="/mavproxyform" element={<MavproxyForm />}/>   
      </Routes>
    </BrowserRouter>   
  )
}






