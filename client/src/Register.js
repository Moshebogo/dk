import  {useState}  from "react"

export default function Register() {

const [stateUsername, setUsername] = useState("")
const [statePassword, setPassword] = useState("")

const formData = {
    username: stateUsername,
    password: statePassword
}

function submitForm(e) {
   e.preventDefault()


//    TODO
    fetch("/registerLogin", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(resp => resp.json())
    .then(data => console.log(data))

    

//    document.querySelector("#form").reset()
}



    return (
    <div>
        <form id="form" onSubmit={ (e) => submitForm(e)}>
            <label>Username: </label>
            <input value={stateUsername} onChange={ (e) => setUsername(e.target.value)} type="text"></input>
            <label>Password: </label>
            <input value={statePassword} onChange={ (e) =>  setPassword(e.target.value)} type="text"></input>
            <input type="submit"></input>
        </form>
    </div>
    )
}