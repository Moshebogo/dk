import  {useState}  from "react"
import { FiEye } from "react-icons/fi";

export default function Register({ checkCookie }) {

// used to create a h3 if the password is incorrect
const [userError, setUserError] = useState(false)    
// state for the user's info    
const [stateUsername, setUsername] = useState("")
const [statePassword, setPassword] = useState("")
const [showPassword, setShowPassword] = useState("password")

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
// TODO make this work!!!
function changeShowPassword(e) {
    if (showPassword == "password") {
        setShowPassword("text")
    } else if (showPassword == "text")  {
      setShowPassword("password")
    }
}    
    

return (
   <div id="register">
       {userError && <h3 style={{textAlign: 'center', color: 'red'}}>Username or Password Incorrect, Please try Again.</h3>}
        <form id="form"   onSubmit={ (e) => submitForm(e)}>
            <label className="label_on_the_left">Username: </label>
            <input className="username_input" value={stateUsername} onChange={ (e) => setUsername(e.target.value)} type="text" name="name"></input>
            <label className="label_on_the_left">Password: </label>
            <div>
                <input className="password_input" value={statePassword} onChange={ (e) => setPassword(e.target.value)} type={showPassword}></input>
                <FiEye className="reveal" onClick={changeShowPassword}/>
            </div>
            <input style={{'backgroundColor': 'green'}}  type="submit" value="Register/Log In"></input>
        </form>
    </div> 
    )
}