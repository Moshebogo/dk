export default function Register() {

function submitForm(e) {
   e.preventDefault()

    fetch("/register", )
    

   document.query
}



    return (
    <div>
        <form onSubmit={ (e) => submitForm(e)}>
            <label>Username: </label>
            <input type="text"></input>
            <label>Password: </label>
            <input typr="text"></input>
            <input type="submit"></input>
        </form>
    </div>
    )
}