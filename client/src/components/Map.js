import { GoogleMap, useJsApiLoader, Marker, MarkerClusterer } from "@react-google-maps/api"
import Geocode from "react-geocode";
import { useState } from 'react'

export default function Map({ markers, setMarker }) {

const [mapCenter, setMapCenter] = useState({
    lat: 40.7347,
    lng: -74.3152
})    
const [altitude, setAltitude] = useState(2)
const [IpAddress, setIpAddress] = useState(1)
const [homeLocation, setHomeLocation] = useState("")
// state for the red pin if an address is found
const [redPin, setRedPin] = useState({
    lat: 40.7347,
    lng: -74.3152
})
// state for the total route distance 
const [actualDistance, setActualDistance] = useState(0)





// this function will find the location of the device and will handle accordingly if the device allows it, 
// it will also handle errors, the neccasary callback functions are all declared inside the master function, 
// they are all invoked by a simple onClick event.
function findDeviceLocation() {
    function success(pos) {
        setMapCenter({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
        })
        setRedPin({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
        })
        console.log(redPin)

    }
    function errors(err) {
        console.log(`ERROR(${err.code}): ${err.message}`)
    }
    const geoOptions = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximunAge: 0
    }
    if (navigator.geolocation) {
        navigator.permissions
        .query({name : 'geolocation'})
        .then( result => {
            switch (result.state) {
                case 'granted':                   
                case 'prompt':
                  navigator.geolocation.getCurrentPosition(success, errors, geoOptions)
                    break;
                case 'denied':
                    console.log('Unable To Find Current Location: Permission Denied')
                    break;
            }
            })        
    }
}    

// Boiler-plate stuff for GeoCode 
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API)
Geocode.setLanguage("en")
Geocode.setLocationType("ROOFTOP")

// sets the center of the map to the entered address 
function handlekeyDown(e) {
    if (e.key == "Enter") {
        Geocode.fromAddress(e.target.value).then(
            resp => {
                setRedPin({
                    lat: resp.results[0].geometry.location.lat,
                    lng: resp.results[0].geometry.location.lng
                })
                console.log(redPin)
                setMapCenter({
                    lat: resp.results[0].geometry.location.lat,
                    lng: resp.results[0].geometry.location.lng
                })
            }
        )
        // resets the input form, regardless if it found the address or not
        .then(data => setHomeLocation(""))
        .catch(error => console.log(error), setHomeLocation(""))
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
    setMarker(prev => markers.filter( (marker) => markers.indexOf(marker) !== index))      
}

// function to save route of MARKERS
function saveMarkerRoute(e) {
    fetch("/save_route_to_marker_commands", {
        method: 'POST',
        headers: {'Content-Type' : 'application/JSON'},
        body: JSON.stringify(markers)
    })
    .then(resp => resp.json())
    .then(returedMarkerRoute => console.log(returedMarkerRoute))
}

//  TODO load all routes so the user can save multiple and select anyone
// 
// 
// function to load route of MARKERS
function loadMarkerRoute(e) {
   fetch("/load_route_from_marker_commands")
   .then(resp => resp.json())
   .then(returedMarkers => {
    setMarker( returedMarkers.route )
  })
}

// function to clear all markers
function clearMarkerRoute(e) {
    setMarker( [] )
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
        <label style={{'textAlign' : 'center'}}>Look up address Manually: </label>
        <input type="text"
               value={homeLocation}
               onChange={ (e) => setHomeLocation(e.target.value)}
               onKeyDown={ (e) => handlekeyDown(e)} 
               ></input>
               <button onClick={ (e) => findDeviceLocation(e)}>Or Just Find My Location</button>
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
                        {/* <Marker 
                           position={{lat: 40.7347, lng: -74.3152}}
                           icon={{
                                 url: 'https://c8.alamy.com/comp/R1PYCB/drone-vector-icon-isolated-on-transparent-background-drone-transparency-logo-concept-R1PYCB.jpg',
                                  scaledSize: new window.google.maps.Size(20, 20)
                                 }}
                        /> */}
                        
 
                </GoogleMap>
                {/* input for the altitude and IP Address */}
                <form onSubmit={ (e) => handleMapSubmit(e)} style={{'display':'flex', 'flexDirection':'column', 'width':'20%', 'margin':'auto'}}>
                    <label style={{'textAlign' : 'center'}}>IP Address: </label>
                    <input 
                        type="text"
                        placeholder='ie: xxx-xxx-x-xxx'
                        value={IpAddress}
                        onChange={ (e) => setIpAddress(e.target.value)}>
                    </input>
                    <label style={{'textAlign' : 'center'}}>Desired Takeoff Altitude: </label>
                    <input 
                        type="number"
                        placeholder='ie: 10'
                        value={altitude}
                        onChange={ (e) => setAltitude(e.target.value)}> 
                    </input>
                    <input type="submit" value="Send Commands!"></input>
                </form>
                <button onClick={ (e) => saveMarkerRoute(e)}>Save Route</button>
                <button onClick={ (e) => loadMarkerRoute(e)}>Load Route</button>
                <button onClick={ (e) => clearMarkerRoute(e)}>Clear All Markers</button>
          <div>
            <h3>{markers.length > 1 ? "Total Distance: " : "Create a route to view the Total Distance here."}</h3>
          </div>
          </div>  
          
        :
        <h1>API key not loaded yet</h1> )
}