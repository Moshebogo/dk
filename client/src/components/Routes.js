import { useEffect, useState } from "react";
import Register from "./Register"
import RouteContainer from "./RouteContainer";
import LoggedIn from "./LoggedIn";


export default function Routes({ userData, setUserData }) {


const [stateUser, setUser] = useState(false)

// for when the user correctly logs in 
function checkCookie(){
    fetch("/checkCookie")
    .then(resp => {
        resp.ok ? setUser(true) : setUser(false)
        return resp.json()
    })
    .then(returnedData => {
        setUserData(returnedData)
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
                <Register setUserData={setUserData} checkCookie={checkCookie} stateUser={stateUser} setUser={setUser} />
            </div> 
            ) : (<>
               <LoggedIn userData={userData}/>
               <RouteContainer handleLogOut={handleLogOut} checkCookie={checkCookie}/>
               </>
            )
        }
        </div>
    )
}