import { useState } from "react"
import EachRouteFromDb from "./EachRouteFromDb"

export default function TestForMultipleRoutes() {

    const [routes, setRoutes] = useState([1, 2, 3, 4, 5, 6, 7])
    
    return (
        <div className="gallery_items">
               {routes.map( route => {
                return <EachRouteFromDb />
               })}               
        </div>
    )
}