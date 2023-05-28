import { useEffect, useState } from "react";
import Register from "./Register"
import Test from "./RouteContainer";
export default function Routes() {


const [stateUser, setUser] = useState(false)

// for when the user correctly logs in 
function checkCookie(){
    fetch("/checkCookie")
    .then(resp => resp.json())
    .then(data => {setUser(prev => !prev)
                   console.log(data)})
}

// DELETE the cookie and Log Out
function handleLogOut(e) {
    fetch("/logOut", {
        method: "DELETE" })
    .then(resp => resp.json())
    .then(data => {console.log(data)
                    setUser(prev => !prev)}) 
}

    return (
        <div>
            { !stateUser ? (
            <div>
                <Register checkCookie={checkCookie} stateUser={stateUser} setUser={setUser} />
            </div> 
            ) : (
            <Test handleLogOut={handleLogOut} checkCookie={checkCookie}/>
            )
        }
        </div>
    )
}