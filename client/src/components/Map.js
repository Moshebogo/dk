import {v4 as uuid} from 'uuid' 
import { GoogleMap, useJsApiLoader, Marker, MarkerClusterer } from "@react-google-maps/api"
import { useState } from 'react'

export default function Map() {

const [markers, setMarker] = useState( [{lat: 40.7347, lng: -74.3152}] )
const [altitude, setAltitude] = useState(2)
const [IpAddress, setIpAddress] = useState(1)

// boiler-plate stuff for google maps
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

// function to add a new marker 
function addMarker(e) {
    setMarker(prev => [...markers,  {lat:e.latLng.lat() , lng:e.latLng.lng()}] )
}

// function to delete a marker  
function removeMarker(index) {
    setMarker(prev => markers.filter( (marker) => markers.indexOf(marker) !== index))
}

// function to handle the map-form submit
function handleMapSubmit(e) {
    e.preventDefault()
    // array_for_post = markers
    fetch("/map", {
        method: 'POST',
        headers: {'Content-Type' : 'application/JSON'},
        body: JSON.stringify({
            ip: IpAddress,
            takeOffAltitude: altitude,
            markers: markers
         })
    })
    .then(resp => resp.json())
    .then(data => console.log(data))

    //  setAltitude("")
    //  setIpAddress("")
    //  setMarker([])
}
  
return (isLoaded ?
       <div>
            <GoogleMap
                mapContainerStyle={container}
                center={{lat: 40.7347, lng: -74.3152}}
                zoom={13}
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
                {/* input for the altitude and IP Address */}
                <form onSubmit={ (e) => handleMapSubmit(e)} style={{'display':'flex', 'flexDirection':'column', 'width':'20%', 'margin':'auto'}}>
                    <label>IP Address: </label>
                    <input type="text"
                           placeholder='ie: xxx-xxx-x-xxx'
                           value={IpAddress}
                           onChange={ (e) => setIpAddress(e.target.value)}>
                    </input>
                    <label>Desired Takeoff Altitude: </label>
                    <input type="number"
                           placeholder='ie: 10'
                           value={altitude}
                           onChange={ (e) => setAltitude(e.target.value)}> 
                    </input>
                    <input type="submit" value="Send Commands!"></input>
                </form>
          </div>  
        :
        <h1>API key not loaded yet</h1> )
}