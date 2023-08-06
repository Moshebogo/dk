import { GoogleMap, useJsApiLoader, Marker, Polyline } from "@react-google-maps/api"


export default function RouteToBeSaved({ routeFromMarkers }){
    
    // Boiler-plate stuff for google maps
    const container = {
        position: 'relative',
        height: '700px',
        margin: ' auto',
        width: '700px',
        border: '2px solid black',
        borderRadius: '20px',
        boxShadow: '10px 10px',
        overflow: 'hidden'
    }
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
    })
    const {options} = {
        disableDefaultUI: true
    }


    
    
    return ( isLoaded ?
        <div>
            <GoogleMap
                    mapContainerStyle={container}
                    center={{lat: 40.7347, lng: -74.3152}}
                    zoom={14}
                    options={options}
                    position={routeFromMarkers[0]}
                    id="sd">
                    { routeFromMarkers.map( (route, index) => {
                        return <Marker 
                                      key={index}
                                      position={route}
                                      icon={{
                                        url: 'https://c8.alamy.com/comp/R1PYCB/drone-vector-icon-isolated-on-transparent-background-drone-transparency-logo-concept-R1PYCB.jpg',
                                        scaledSize: new window.google.maps.Size(20, 20)
                                        }}
                        />
                    })}
                    <Polyline 
                        path={routeFromMarkers}
                    />
 
            </GoogleMap>
        </div>
        :
        null
    )
}