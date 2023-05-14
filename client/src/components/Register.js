import  {useState}  from "react"

export default function Register({ setUser, stateUser }) {

const [stateInfo, SetInfo] = useState({
    username: "",
    password: ""
})

const [stateUsername, setUsername] = useState("")
const [statePassword, setPassword] = useState("")

const formData = {
    username: stateUsername,
    password: statePassword
}

function submitForm(e) {
   e.preventDefault()
   setUser(prev => !prev) 
    fetch("/registerLogin", {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    })
      .then(resp => resp.json())
      .then(data => {document.querySelector("#form").reset()})
}

function handleClick(e) {
   fetch("/logOut",{
    method: 'DELETE'
   })
   .then(resp => resp.json())
   .then(data => console.log(data))
}


    return (!stateUser ? 
    <div id="register">
        <form id="form" onSubmit={ (e) => submitForm(e)}>
            <label>Username: </label>
            <input value={stateUsername} onChange={ (e) => setUsername(e.target.value)} type="text"></input>
            <label>Password: </label>
            <input value={statePassword} onChange={ (e) =>  setPassword(e.target.value)} type="password"></input>
            <input type="submit"></input>
        </form>
    </div> 
    : 
    <div>
        <button onClick={ (e) => handleClick(e)}>Log Out</button>
    </div>
    )
}