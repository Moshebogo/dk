import { useEffect, useState } from "react"
import EachRouteFromDb from "./EachRouteFromDb"

export default function TestForMultipleRoutes({ setMarker }) {

    const [routes, setRoutes] = useState([])
    // console.log(routes)


  useEffect( () => {
    fetch("/load_all_marker_routes")
        .then(resp => resp.json())
        .then(data => setRoutes(data.routes))
  }, [])
          

  function setMarkersFromAllRoutes(index) {
    setMarker(routes[index])
    console.log(index)
  }
    
    
    return (
        <div className="gallery_items">
        {/* <div> */}
               {routes.map( (route, index) => {
                return <EachRouteFromDb key={index} routeIndex={index} usersRoutes={routes[index]} setMarkersFromAllRoutes={setMarkersFromAllRoutes}/>
               })}               
        </div>
    )
}