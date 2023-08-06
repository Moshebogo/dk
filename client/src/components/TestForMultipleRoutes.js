import { useEffect, useState } from "react"
import EachRouteFromDb from "./EachRouteFromDb"

export default function TestForMultipleRoutes({ setMarker }) {

    const [routes, setRoutes] = useState([])
    const [routeName, setRouteName] = useState('')
    // console.log(routes)


  useEffect( () => {
    fetch("/load_all_marker_routes")
        .then(resp => resp.json())
        .then(data => {
          setRoutes(data.routes)
          setRouteName(data.routeNames)
          console.log(data)
        })
  }, [])
          

  function setMarkersFromAllRoutes(index) {
    setMarker(routes[index])
    console.log(index)
  }
    
    
    return (
        <div className="gallery_items">
               {routes.map( (route, index) => {
                return <EachRouteFromDb routeName={routeName[index]} key={index} routeIndex={index} usersRoutes={routes[index]} setMarkersFromAllRoutes={setMarkersFromAllRoutes}/>
               })}               
        </div>
    )
}