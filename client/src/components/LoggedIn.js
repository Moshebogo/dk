import { useEffect } from "react"

export default function LoggedIn({ userData }) {
  
  console.log(userData)

    return (
        <div style={{ 'position': 'absolute', 'left': '5%', 'top': '30%', 'margin': 'auto' }}>
          <h3>Flights:           {userData.flights           }</h3> 
          <h3>Attempted Flights: {userData.attempted_flights }</h3>  
          <h3>Crashes:           {userData.crashes           }</h3>
          <h3>Total Commands:    {userData.total_commands    }</h3>
          <h3>Meters Horizontal: {userData.meters_horizontal }</h3>
        </div>
    )
}