import '/home/eli_moshe/Development/code/dk/client/src/App.css';
import {useState} from "react"
import {  BrowserRouter, Routes, Route, Router} from "react-router-dom"
import Buttons from './buttons';
import MavproxyForm from './MavproxyForm';
import Register from './Register';
import Header from './Header';


export default  function App() {


  return (
    <BrowserRouter>
      <Header />
      <Routes>
           <Route path="/register"     element={<Register />}/>   
           <Route path="/buttons"      element={<Buttons  />}/> 
           <Route path="/mavproxyform" element={<MavproxyForm />}/>   
      </Routes>
    </BrowserRouter>   
  )
}






