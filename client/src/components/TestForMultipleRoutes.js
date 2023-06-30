import { useState } from "react"
import EachRouteFromDb from "./EachRouteFromDb"

export default function TestForMultipleRoutes() {

    const [routes, setRoutes] = useState([1, 2, 3, 4])
    
    return (
        <div>
            {routes.map(route => 
                        {
                        return <EachRouteFromDb />
                        }
                        )
            }
        </div>
    )
}