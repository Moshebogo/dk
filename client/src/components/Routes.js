import { useEffect, useState } from "react";
import Register from "./Register"
import RouteContainer from "./RouteContainer";
import LoggedIn from "./LoggedIn";


export default function Routes() {


const [stateUser, setUser] = useState(false)

// for when the user correctly logs in 
function checkCookie(){
    fetch("/checkCookie")
    .then(resp => {
        resp.json()
        resp.ok ? setUser(true) : setUser(false)
    })
    .then(data => {
        console.log(data) 
     })
}

// DELETE the cookie and Log Out
function handleLogOut(e) {
    fetch("/logOut", {
        method: "DELETE" })
    .then(resp => resp.json())
    .then(data => {console.log(data)
                    setUser(prev => !prev)}) 
}

useEffect( () => {
    checkCookie()   
}, [])

    return (
        <div>
            { !stateUser ? (
            <div>
                <Register checkCookie={checkCookie} stateUser={stateUser} setUser={setUser} />
            </div> 
            ) : (<>
               <LoggedIn />
               <RouteContainer handleLogOut={handleLogOut} checkCookie={checkCookie}/>
               </>
            )
        }
        </div>
    )
}