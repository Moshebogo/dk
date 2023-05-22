import { useEffect, useState } from "react";
import Register from "./Register"
import Test from "./Test";
export default function Routes() {


    const [stateUser, setUser] = useState(false)

// for when the user correctly logs in 
  function checkCookie(){
      fetch("/checkCookie")
      .then(resp => resp.json())
      .then(data => setUser(prev => !prev))
}

  // DELETE the cookie and Log Out
function handleClick(e) {
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
            <Test handleClick={handleClick} checkCookie={checkCookie}/>
            )
        }
        </div>
    )
}