import { useEffect } from "react"

export default function LoggedIn({ userData }) {
  
  console.log(userData)

    return (
        <div style={{ 'position': 'absolute', 'left': '5%', 'top': '30%', 'margin': 'auto' }}>
          <h3>Flights:           {userData.flights           ? userData.flights           : "None, as of yet!"}</h3> 
          <h3>Attempted Flights: {userData.attempted_flights ? userData.attempted_flights : "None, as of yet!"}</h3>  
          <h3>Crashes:           {userData.crashes           ? userData.crashes           : "None, as of yet!"}</h3>
          <h3>Total Commands:    {userData.total_commands    ? userData.total_commands    : "None, as of yet!"}</h3>
          <h3>Meters Horizontal: {userData.meters_horizontal ? userData.meters_horizontal : "None, as of yet!"}</h3>
        </div>
    )
}