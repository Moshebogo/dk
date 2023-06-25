import {v4 as uuid} from 'uuid' 
import { GoogleMap, useJsApiLoader, Marker, MarkerClusterer } from "@react-google-maps/api"
import Geocode from "react-geocode";
import { useState } from 'react'

export default function Map() {
 

const [mapCenter, setMapCenter] = useState({
    lat: 40.7347,
    lng: -74.3152
})    

const [markers, setMarker] = useState( [{lat: 40.7347, lng: -74.3152}] )
const [altitude, setAltitude] = useState(2)
const [IpAddress, setIpAddress] = useState(1)
const [homeLocation, setHomeLocation] = useState("")

// Boiler-plate stuff for Geocode 
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API)
Geocode.setLanguage("en")
Geocode.setLocationType("ROOFTOP")

// function to set the center of the map
function actuallySetCenterOfMap() {
    
}

function handlekeyDown(e) {
    if (e.key == "Enter") {
        // setMapCenter(e.target.value)
        // console.log(mapCenter)
        Geocode.fromAddress(e.target.value).then(
            resp => {
                console.log(resp)
                setMapCenter({
                    lat: resp.results[0].geometry.location.lat,
                    lng: resp.results[0].geometry.location.lng
                })
            }
        )
    }
        
    
}

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
 
// function to add a new marker 
function addMarker(e) {
    setMarker(prev => [ ...markers,  {lat : e.latLng.lat() , lng : e.latLng.lng()}] )
}

// function to delete a marker  
function removeMarker(index) {
    setMarker(prev => markers.filter( (marker) => markers.indexOf(marker) !== index) )
}

// function to handle the map-form submit
function handleMapSubmit(e) {
    e.preventDefault()
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
    .then(data => console.log(data)

    //  setAltitude("")
    //  setIpAddress("")
    //  setMarker([])
    )
}
      
return (isLoaded ?
       <div>
       <div style={{'display':'flex', 'flexDirection':'column', 'width':'20%', 'margin':'auto'}}>
        <label>Enter your current address: </label>
        <input type="text"
               value={homeLocation}
               onChange={ (e) => setHomeLocation(e.target.value)}
               onKeyDown={ (e) => handlekeyDown(e)} 
               ></input>
        </div>
            <GoogleMap
                mapContainerStyle={container}
                center={mapCenter}
                zoom={15}
                options={options}
                position={{lat: 40.7347, lng: -74.3152}}
                onClick={ (e) => addMarker(e)}    
                >
 
                {markers.map( (marker, index) => {
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
                    <input 
                        type="text"
                        placeholder='ie: xxx-xxx-x-xxx'
                        value={IpAddress}
                        onChange={ (e) => setIpAddress(e.target.value)}>
                    </input>
                    <label>Desired Takeoff Altitude: </label>
                    <input 
                        type="number"
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