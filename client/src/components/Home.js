import { useState, useEffect } from "react"
import TestForMultipleRoutes from "./TestForMultipleRoutes"
import { useSearchParams } from "react-router-dom"
import { Outlet, Link } from "react-router-dom"


export default function Home({ setMarker, stateUser } ) {


const [userLoggedIn, setUserLoggedIn] = useState()
useEffect( () => {
    fetch("/checkCookie")
    .then(resp => {
        resp.ok ? setUserLoggedIn(true) : setUserLoggedIn(false)
        return resp.json()
    })
}, [])



    return (
        <div>
            { userLoggedIn ?
                 <TestForMultipleRoutes setMarker={setMarker} />
                :
            <div id="loggedOutForSavedRoutes">
               Click  
              <a  href="/register" id="aTagToLogIn">{` Here `}</a>
              To Log In and View Your Saved Routes.
            </div> 
            }

        </div> 
    )
}