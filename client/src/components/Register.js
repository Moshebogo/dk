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
    // showPassword === "password" ? setShowPassword("text") : setShowPassword("password")
        if (showPassword === "password") {
            setShowPassword("text")
        } else if (showPassword === "text")  {
        setShowPassword("password")
        }
}    
    

return (
   <div id="register">
       <h2 id="welcomeMesssage">Welcome! Please log in if you and account with us already. If you don't have one, feel free to create one!</h2>
       {userError && <h3 style={{textAlign: 'center', color: 'red'}}>Username or Password Incorrect, Please try Again.</h3>}
        <form id="registerForm"   onSubmit={ (e) => submitForm(e)}>
            <label>Username: </label>
            <input className="registerInput" value={stateUsername} onChange={ (e) => setUsername(e.target.value)} type="text" name="name" required></input>
            <div id="revealPassword">
                <label>Password: </label>
                <FiEye id="FiEye" onClick={changeShowPassword}/>
            </div>
            <input className="registerInput" value={statePassword} onChange={ (e) => setPassword(e.target.value)} type={showPassword} required></input>
            <input id="registerButton"  type="submit" value="Register/Log In"></input>
        </form>
    </div> 
    )
}