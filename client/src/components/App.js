import '/home/eli_moshe/Development/code/dk/client/src/App.css';
import {useState} from "react"
import Buttons from './buttons';
import MavproxyForm from './MavproxyForm';
import Register from './Register';
import Header from './Header';


export default  function App() {


  return (
    <div>
      <Header />
      <Register />
      <Buttons />
      <MavproxyForm />
    </div>
  )
}






