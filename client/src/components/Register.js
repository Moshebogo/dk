import  {useState}  from "react"
import LoggedIn from "./LoggedIn"
// import GoogleMaps from "./GoogleMaps"

export default function     Register({ setUser, stateUser }) {

    // console.log(document.cookie)
    // const x = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // console.log(document.cookie)
    // console.log('x: ', x)

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
        // console.log(data)
        setUser((prev) => !prev)
        setPassword("")
        setUsername("")      
    })
    return (
        < LoggedIn/>
    )
}


// DELETE the cookie and Log Out
function handelClick(e) {
    fetch("/logOut", {
        method: "DELETE"
    })
    .then(resp => resp.json())
    .then(data => console.log(data)) 
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
        <button onClick={ (e) => handelClick(e)}>Log Out</button>
    </div> 
    )
}