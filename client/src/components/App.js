import '/home/eli_moshe/Development/code/dk/client/src/App.css';
import {useState} from "react"
import {  BrowserRouter, Routes, Route} from "react-router-dom"
import TestConnection from './TestConnection';
import MavproxyForm from './MavproxyForm';
import Header from './Header';
import Home from './Home';
import Map from './Map';
import SavedRoutes from './Routes';

export default  function App() {

const [stateUser, setUser] = useState(false)

  return (
    <BrowserRouter>
      <Header stateUser={stateUser}/>
        <Routes>
            <Route path="/"             element={<Home />}/>
            <Route path="/testConnection"      element={<TestConnection />}/> 
            <Route path="/map"          element={<Map/>}/>
            <Route path="/savedroutes"  element={<SavedRoutes stateUser={stateUser} setUser={setUser} />}/>
            <Route path="/mavproxyform" element={<MavproxyForm />}/>   
        </Routes>
    </BrowserRouter>   
  )
}