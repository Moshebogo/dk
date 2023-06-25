import { useEffect, useState } from "react";
import Register from "./Register"
import RouteContainer from "./RouteContainer";
import LoggedIn from "./LoggedIn";


export default function Routes({ userData, setUserData }) {


const [stateUser, setUser] = useState(false)
const [createdUsername, setCreatedUsername] = useState("")


// for when the user correctly logs in 
function checkCookie(){
    fetch("/checkCookie")
    .then(resp => {
        resp.ok ? setUser(true) : setUser(false)
        return resp.json()
    })
    .then(returnedData => {
        console.log(returnedData)
        setCreatedUsername(returnedData.username)
        setUserData(returnedData)
     })
}

// DELETE the cookie and Log Out
function handleLogOut(e) {
    fetch("/logOut", {
        method: "DELETE" })
    .then(resp => resp.json())
    .then(data =>  setUser(prev => !prev)) 
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
               <RouteContainer createdUsername={createdUsername} handleLogOut={handleLogOut} checkCookie={checkCookie}/>
               </>
            )
        }
        </div>
    )
}