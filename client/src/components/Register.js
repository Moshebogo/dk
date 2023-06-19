import  {useState}  from "react"

export default function Register({ checkCookie, setCreatedUsername }) {

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
      .then(returnedData =>    {
        console.log(returnedData)
        setCreatedUsername(returnedData.username)
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
            <input style={{'backgroundColor': 'green'}}  type="submit" value="Register/Log In"></input>
        </form>
    </div> 
    )
}