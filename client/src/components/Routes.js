import { useEffect, useState } from "react";
import Register from "./Register"
import RouteContainer from "./RouteContainer";
import LoggedIn from "./LoggedIn";
import Map from "./Map.js"


export default function Routes({ userData, setUserData, setUser, stateUser, markers, setMarker, removeDiv, setRemoveDiv, setFlyWithMap ,flyWithMap, setFlyWithDirect, flyWithDirect }) {


// const [stateUser, setUser] = useState(false)
const [createdUsername, setCreatedUsername] = useState("")
const [oldUser, setOldUser] = useState(false) 



function renderFlyWithDirect(e) {
  setFlyWithDirect(true)
  setFlyWithMap(false)
  changeClassNameForRemovediv()
}

function renderFlyWithMap(e) {
  setFlyWithMap(true)
  setFlyWithDirect(false)
//   changeClassNameForRemovediv()
}

// for when the user correctly logs in 
function checkCookie(){
    fetch("/checkCookie")
    .then(resp => {
        resp.ok ? setUser(true) : setUser(false)
        return resp.json()
    })
    .then(returnedData => {
        // console.log(rweturnedData)
        setCreatedUsername(returnedData.username)
        setOldUser(returnedData.old_user)
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

// This is so that if the page gets reloaded, it will log in the user from the set cookie,
// with out this the cookie can only affect the front end right when the user logs in.
useEffect( () => {
    checkCookie()   
}, [])

function changeClassNameForRemovediv() {
    if (removeDiv === "") {
       setRemoveDiv("removeTheDiv")   
    } else {
       setRemoveDiv("")
       setFlyWithMap(false)
       setFlyWithDirect(false)
    }
  }


    return (
        <div>
            { !stateUser ? (
            <div>
                <Register setUserData={setUserData} checkCookie={checkCookie} stateUser={stateUser} setUser={setUser} />
            </div> 
            ) : (
               <div>
                    { flyWithDirect && 
                    <>
                      <RouteContainer setRemoveDiv={setRemoveDiv} createdUsername={createdUsername} handleLogOut={handleLogOut} checkCookie={checkCookie} oldUser={oldUser}/> 
                      <LoggedIn userData={userData}/>
                    </>
                    }
                    { flyWithMap &&
                        <Map markers={markers} setMarker={setMarker}/>
                    }
               <div className={removeDiv}>
                    <h1>How Would You Like To Get Flying Today? </h1>
                    <div id="directOrMapDiv">
                        <div onClick={renderFlyWithDirect}><h2>Let's Fly Using Direct Commands</h2></div>
                        <div onClick={renderFlyWithMap}   ><h2>Let's Fly Using A Map</h2></div>
                    </div> 
                 </div>            
               </div>
            )
        }
        </div>
    )
}