import { Outlet, Link } from "react-router-dom"

export default function Header() {

    return (
      <div id="entireHeader">

      <Link to="/">
        <button>Home</button>
      </Link>

      <Link  to="/register">
         <button>Log-In / Register</button>
      </Link>

      <Link to="/buttons">
        <button>Quick Flight</button>
      </Link>
      
      <Link to="/map">
        <button>Map</button>
      </Link>

      <Link to="/savedroutes">
        <button>Saved Routes</button>
      </Link>

      <Link to="/mavproxyform">
        <button>Mavproxy</button>
      </Link>
      </div>
    )
}   