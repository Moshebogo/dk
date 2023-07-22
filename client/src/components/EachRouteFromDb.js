    import { GoogleMap, useJsApiLoader, Marker, MarkerClusterer, Polyline } from "@react-google-maps/api"

    export default function EachRouteFromDb({ usersRoutes, routeIndex, setMarkersFromAllRoutes }) {

    // console.log("inside EachRouteFromDb => ", usersRoutes)
    

    // Boiler-plate stuff for google maps
    const container = {
        height: '700px',
        margin: '10px',
        width: '30%',
        border: '2px solid blue',
        // 'box-sizing' : 'border-box',
        'overflow-x': 'scroll'
    }
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
    })
    const {options} = {
        disableDefaultUI: true
    }

    
        return ( isLoaded ?
            // <div className="gallery_image">
                <GoogleMap
                    mapContainerStyle={container}
                    center={{lat: 40.7347, lng: -74.3152}}
                    zoom={14}
                    options={options}
                    position={{lat: 40.7347, lng: -74.3152}}
                    onClick={ (e) => setMarkersFromAllRoutes(routeIndex)}
                    id="sd"
                    >
                     {usersRoutes.map( (route, index) => {
                          return <Marker 
                                      key={index}
                                      position={route}
                                      icon={{
                                        url: 'https://c8.alamy.com/comp/R1PYCB/drone-vector-icon-isolated-on-transparent-background-drone-transparency-logo-concept-R1PYCB.jpg',
                                        scaledSize: new window.google.maps.Size(20, 20)
                                        }}
                                  />
                    }) }
                    <Polyline 
                        path={usersRoutes}
                    />
                    </GoogleMap>    
            //  </div> 
                :
            null
            
        )
    }