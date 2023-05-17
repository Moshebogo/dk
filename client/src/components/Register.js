import  {useState}  from "react"
import GoogleMaps from "./GoogleMaps"

export default function Register({ setUser, stateUser }) {
    
const [stateUsername, setUsername] = useState("")
const [statePassword, setPassword] = useState("")


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
        console.log(data)
        setUser((prev) => !prev)
        setPassword("")
        setUsername("")
    })
}
     
function handleClick(e) {   
   fetch("/logOut",{
    method: 'DELETE'
   })
   .then(resp => resp.json())
   .then(data => {console.log(data)
                  setUser((prev) => !prev)})
}

    return (!stateUser ? 
    <div id="register">
        <form id="form"   onSubmit={ (e) => submitForm(e)}>
            <label>Username: </label>
            <input value={stateUsername} onChange={ (e) => setUsername(e.target.value)} type="text"></input>
            <label>Password: </label>
            <input value={statePassword} onChange={ (e) => setPassword(e.target.value)} type="password"></input>
            <input type="submit"></input>
        </form>
    </div> 
    : 
    <div>
        <button onClick={ (e) => handleClick(e)}>Log Out</button>
        {/* <GoogleMaps /> */}
    </div>
    )
}