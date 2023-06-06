import { useEffect } from "react"

export default function LoggedIn({ checkCookie, userData }) {
 console.log(userData)
// useEffect( () => {
//     checkCookie()
// }, [])

    return (
        <div style={{ 'position': 'absolute', 'left': '5%', 'top': '30%', 'margin': 'auto' }}>
          <h3>Flights: </h3> 
          <h3>Attempted Flights: </h3>  
          <h3>Crashes: </h3>
          <h3>Total Commands: </h3>
          <h3>Meters Horizontal: </h3>
          <h1>{userData}</h1>
        </div>
    )
}