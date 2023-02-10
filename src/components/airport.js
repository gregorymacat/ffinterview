import React, {useEffect, useState} from 'react';
import axios from 'axios';

// Sec 1: airport idientifier (icao), 
// Sec 2: airport name **displayName**, 
// Sec 3: available runways **runways**,  
// Sec 4: aiport lat/long **latitudeInDegrees, longitudeInDegrees**

function Airport(props) {
  const [airportId, setAirportId] = useState([]);
  const [airportName, setAirportName] = useState([]);
  const [availRunways, setAvailRunways] = useState([]);
  const [airportLatLong, setAirportLatLong] = useState([]);

  const getAirportData = (id) => {
    axios({
        method: 'get',
        url: `http://localhost:3000/airports/${id}.json`,
    })
      .then((response) => {
      console.log('This is the response: ', response.data);
      const {icao, displayName, runways, latitudeInDegrees, longitudeInDegrees} = response.data;

      setAirportId(icao);
      setAirportName(displayName);
      setAirportLatLong(`${latitudeInDegrees}, ${longitudeInDegrees}`);
      setAvailRunways(runways);
      })
      .catch((err) => {
      return err;
      });
  }
  
  useEffect(() => {
    getAirportData(props.userAirportId);
  }, [props.userAirportId]);

  return (
    <div className="airport-container">
        <h2>{airportId}</h2>
        <b>{airportName}</b>
        <p>Runways</p>
        {
        availRunways.map(runway => {
            const {
            ident,
            name,
            length,
            width,
            surfaceType,
            } = runway;

            return (
            <li key={runway.ident}>
                Name: {name}, 
                Identifier: {ident}, 
                Length: {length}, 
                Width: {width}, 
                surfaceType: {surfaceType}
            </li>
            );
        })
        }
        <p>Latitude, Longitude: {airportLatLong}</p>
    </div>
  )
}

export default Airport;