import { GoogleMap, useJsApiLoader, Marker, MarkerClusterer } from "@react-google-maps/api"

export default function EachRouteFromDb() {

// Boiler-plate stuff for google maps
const container = {
    width: '100%',
    height: '70vh'
}
const {isLoaded} = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
})
const {options} = {
    disableDefaultUI: true
}
    return ( isLoaded ?
            <GoogleMap
                mapContainerStyle={container}
                center={{lat: 40.7347, lng: -74.3152}}
                zoom={15}
                options={options}
                position={{lat: 40.7347, lng: -74.3152}}
                className="gallery_image"
            /> 
            :
            null
    )
}