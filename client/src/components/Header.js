import { Outlet, Link } from "react-router-dom"

export default function Header({ stateUser}) {

    return (

      <div id="entireHeader">

      {/* <Link to="/">
        <img src="/home/eli_moshe/Development/code/dk/assets/DALL·E 2023-05-01 11.49.17 - drone flyning intont the sunset with text _drone force_wrapped around the drone in small letters.png"/>
      </Link> */}

        <div id="buttonBlock">
        
          {/* <Link  to="/register">
            <button className="headerButtons">{!stateUser ? "Log-In / Register" : "Log Out"}</button>
          </Link> */}

          <Link to="/buttons">
            <button className="headerButtons">Quick Flight</button>
          </Link>
          
          <Link to="/map">
            <button className="headerButtons">Map</button>
          </Link>

          <Link to="/savedroutes">
            <button className="headerButtons">Saved Routes</button>
          </Link>

          <Link to="/mavproxyform">
            <button className="headerButtons">Mavproxy</button>
          </Link>
        </div>

      </div>
    )
}   