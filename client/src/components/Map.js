import {v4 as uuid} from 'uuid' 
import { GoogleMap, useJsApiLoader, Marker, MarkerClusterer } from "@react-google-maps/api"
import { useState } from 'react'

export default function Map() {

const [markers, setMarker] = useState([])
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

function addMarker(e) {
    setMarker(prev => [...markers,  {lat:e.latLng.lat() , lng:e.latLng.lng()}])
    console.log(markers)
}

function removeMarker(index) {
    setMarker(prev => markers.filter( (marker) => markers.indexOf(marker) !== index))
}




return (isLoaded ?
       <div>
            <GoogleMap
                mapContainerStyle={container}
                center={{lat: 40.7347, lng: -74.3152}}
                zoom={15}
                options={options}
                position={{lat: 40.7347, lng: -74.3152}}
                onClick={ (e) => addMarker(e)}    
                >

                {markers.map((marker, index) => {
                return <Marker 
                            key={index}
                            position={{lat: marker.lat, lng: marker.lng}}
                            icon={{
                                url: 'https://c8.alamy.com/comp/R1PYCB/drone-vector-icon-isolated-on-transparent-background-drone-transparency-logo-concept-R1PYCB.jpg',
                                scaledSize: new window.google.maps.Size(20, 20)
                                }}
                            onClick={ (e) => removeMarker(index)}    
                            />  
                })}

                </GoogleMap>
        // </div>  
        :
        <h1>API key not loaded yet</h1> )
}