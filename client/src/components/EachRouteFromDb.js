    import { GoogleMap, useJsApiLoader, Marker, Polyline } from "@react-google-maps/api"

    export default function EachRouteFromDb({ usersRoutes, routeIndex, setMarkersFromAllRoutes, routeName }) {

    // console.log("inside EachRouteFromDb => ", usersRoutes)
    console.log("inside EachRouteFromDb => ", routeName)
    
   
    // Boiler-plate stuff for google maps
    const container = {
        height: '700px',
        margin: '10px',
        width: '30%',
        border: '2px solid black',
        borderRadius: '20px',
        boxShadow: '1px 1px',
        'overflowX': 'scroll'
    }
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
    })
    const {options} = {
        disableDefaultUI: true
    }

    
        return ( isLoaded ?
    // <div className="gallery_image">
            // <div>
            <div id="containerDivEachLoadedMap">
            <h1 id="eachRouteName">{routeName}</h1>
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
                    </div>    
            //   </div> 
     //   </div>
                :
              null
         )
    }