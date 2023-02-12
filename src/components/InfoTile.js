import React, {useEffect, useState} from 'react';
import Airport from './Airport';
import Weather from './Weather';
import axios from 'axios';

function InfoTile(props) {
  const [airportData, setAirportData] = useState({});
  const [weatherData, setWeatherData] = useState({});
  const [isValidId, setIsValidId] = useState(true);

  useEffect(() => {
    axios(`http://localhost:3000/airports/${props.airportId}.json`)
      .then((apiAirportData) => {
        setIsValidId(true);
        setAirportData(apiAirportData.data);
        console.log('Retrieved airportData')
        return axios(`http://localhost:3000/weather/${props.airportId}.json`);
      })
      .then((apiWeatherData) => {
        console.log('Retrieved weatherData')
        setWeatherData(apiWeatherData.data);
      })
      .catch((err) => {
        setIsValidId(false);
        return err;
      })
  }, [props.airportId])
  
  if (!isValidId) {
    return (
      <div className="invalid-id-container">
        <h2>An Invalid ID Was Entered</h2>
        <h3>ID: {props.airportId}</h3>
        <b>Please remove the ID and try again.</b>
      </div>
    )
  } else {
    return (
      <div className="info-tile-container">
        <Airport userAirportId={props.airportId} airportData={airportData}/>
        <Weather weatherData={weatherData}/>
      </div>
    );
  }
}

export default InfoTile;
