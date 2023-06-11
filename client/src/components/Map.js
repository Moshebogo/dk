import {v4 as uuid} from 'uuid' 
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api"
import { useState } from 'react'

export default function Map() {

const [marker, setMarker] = useState({lat: 40.6972090096975, lng: -74.15704266533703})

const container = {
    width: '100%',
    height: '70vh'
}

const {isLoaded} = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
})
  
const {options} = {
    disableDefaultUI: true,

}

function createMarker(e) {
    setMarker({lat:e.latLng.lat() , lng:e.latLng.lng()})
    console.log(marker)
}


return (isLoaded ?
    //    <div>
        <GoogleMap
            mapContainerStyle={container}
            center={{lat: 40.7347, lng: -74.3152}}
            zoom={11}
            options={options}
            position={{lat: 40.7347, lng: -74.3152}}
            onClick={ (e) => createMarker(e)}    
            >

            <Marker 
            key={uuid()}
            position={marker}
            icon={{
                 url: 'https://c8.alamy.com/comp/R1PYCB/drone-vector-icon-isolated-on-transparent-background-drone-transparency-logo-concept-R1PYCB.jpg',
                 scaledSize: new window.google.maps.Size(25, 25)
                 }}
            />

            </GoogleMap>
        // {/* </div>   */}
        :
        <h1>API key not loaded yet</h1> )
}