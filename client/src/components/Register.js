import  {useState}  from "react"

export default function Register({ checkCookie }) {

// used to create a h3 if the password is incorrect
const [userError, setUserError] = useState(false)    
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
    .then(resp => {
       if (resp.status == 404) {
        setUserError(true)
       } 
       return  resp.json()
    }) 
    .then(returnedData => {   
        //   console.log(returnedData)
          setPassword("")
          setUsername("") 
          checkCookie()     
    })
        
    }
    

return (
   <div id="register">
       {userError && <h3 style={{textAlign: 'center', color: 'red'}}>Username or Password Incorrect, Please try Again.</h3>}
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