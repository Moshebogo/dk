import  {useState}  from "react"
import LoggedIn from "./LoggedIn"
// import GoogleMaps from "./GoogleMaps"

export default function Register({ setUser, stateUser,checkCookie }) {

// state for the user's info    
const [stateUsername, setUsername] = useState("")
const [statePassword, setPassword] = useState("")

// actual POST
function submitForm(e) {
   e.preventDefault()
    fetch("/registerLogin", {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: stateUsername,
            password: statePassword
        })
    })
      .then(resp => resp.json())
      .then(data =>    {
        setPassword("")
        setUsername("") 
        checkCookie()     
    })
   
}

return (
   <div id="register">
        <form id="form"   onSubmit={ (e) => submitForm(e)}>
            <label>Username: </label>
            <input value={stateUsername} onChange={ (e) => setUsername(e.target.value)} type="text" name="name"></input>
            <label>Password: </label>
            <input value={statePassword} onChange={ (e) => setPassword(e.target.value)} type="password"></input>
            <input type="submit"></input>
        </form>
    </div> 
    )
}