
import React from 'react'
import { Circle, DirectionsRenderer, GoogleMap, Polyline, useJsApiLoader } from '@react-google-maps/api';
import { useState } from 'react';
import { useEffect } from 'react';
import { ChangePointShape } from '../form/formUtils';

function GoogleMaps({data}) {

  useEffect(() => {
    calculateRoute()
  }, [])

 
  
  const [ directionsResponse, setDirectionsResponse] = useState(null)


  const google = window.google;
  
  async function calculateRoute() {
    // eslint-disable-next-line no-undef
 
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: {lat:+data.lat_from,lng:+data.long_from },
      destination:{lat:+data.lat_to, lng:+data.long_to},
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })
    setDirectionsResponse(results)
    
  }


  const center ={lat:+data.lat_from||33.270569, lng:+data.long_from||44.388852}

 
 
  return (
    <div>
        <div style={{marginTop:"50px"}}>

        <GoogleMap  center={data?.status =='complete' ? 
          ChangePointShape((data?.points)||[])[0]
        :center} zoom={18} mapContainerStyle={{width:'100%' , height:"70vh"}} > 
        {(directionsResponse && data?.status !='complete') && (
            <DirectionsRenderer directions={directionsResponse} />
          )
          }

           {(ChangePointShape((data?.points)||[]) && data?.status =='complete')&&  (
            <Polyline
              path={ChangePointShape((data?.points)||[])}
              options={{
                strokeColor: "#8328f29c", // change the stroke color to primary color 
                strokeOpacity: 1,
                strokeWeight: 6, // increase the stroke weight to 6
                strokeDasharray: [10, 5], // make the line dashed
              }}
            />
          )}
      </GoogleMap>
      
    
    </div>
    </div>
  )
}

export default GoogleMaps