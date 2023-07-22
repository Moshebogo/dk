import { Outlet, Link } from "react-router-dom"

export default function Header({ stateUser, setDarkMode}) {

// TODO finish the dark mode funcionality
  function handleDarkMode(){
     
  }

    return (

      <div id="entireHeader">

      {/* <Link to="/">
        <img src="/home/eli_moshe/Development/code/dk/assets/DALL·E 2023-05-01 11.49.17 - drone flyning intont the sunset with text _drone force_wrapped around the drone in small letters.png"/>
      </Link> */}

        <div id="buttonBlock">
        
          {/* <Link  to="/register">
            <h3 >{!stateUser ? "Log-In / Register" : "Log Out"}</h3>
          </Link> */}

          <Link to="/">
            <h3>Home</h3>
          </Link>

          <Link to="/testConnection">
            <h3>Test Connection</h3>
          </Link>
          
          <Link to="/map">
            <h3>Map</h3>
          </Link>

          <Link to="/savedroutes">
            <h3>Routes</h3>
          </Link>

          <Link to="/mavproxyform">
            <h3>Mavproxy</h3>
          </Link>

          <Link to="/contact">
            <h3>Contact Us</h3>
          </Link>

          <h3 onClick={handleDarkMode}>Dark Mode</h3>
        
        </div>

      </div>
    )
}   