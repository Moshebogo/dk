import Register from "./Register"

export default function SavedRoutes({ stateUser, setUser  }) {

    console.log(document.cookie)
    return (
        <div>
            <Register stateUser={stateUser} setUser={setUser} />
        </div>
    )
}