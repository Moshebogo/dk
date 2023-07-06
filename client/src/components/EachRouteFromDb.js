    import { GoogleMap, useJsApiLoader, Marker, MarkerClusterer } from "@react-google-maps/api"

    export default function EachRouteFromDb() {


    // Boiler-plate stuff for google maps
    const container = {
        position: 'sticky',
        // width: '100%',
        height: '700px',
        margin: '10px',
        width: '50px',
        border: '2px solid blue',
        // 'overflow-X': 'scroll'
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
                    zoom={15}
                    options={options}
                    position={{lat: 40.7347, lng: -74.3152}}
                    // className="gallery_image"
                    
                />
            // </div> 
                :
            null
            
        )
    }