import React, {useEffect, useState} from 'react';

function Airport(props) {
  const [airportId, setAirportId] = useState('');
  const [airportName, setAirportName] = useState('');
  const [availRunways, setAvailRunways] = useState([]);
  const [airportLatLong, setAirportLatLong] = useState('');

  const setAirportData = (allAirportInfo) => {
    console.log('AllAirportInfo: ', allAirportInfo);
    if (Object.keys(allAirportInfo).length === 0) {
      return;
    }
    const {
      icao,
      displayName,
      runways,
      latitudeInDegrees,
      longitudeInDegrees,
    } = allAirportInfo;

    setAirportId(icao || props.userAirportId);
    setAvailRunways(runways);
    setAirportLatLong(`${latitudeInDegrees}, ${longitudeInDegrees}`);

    if (displayName.startsWith('null')) {
      setAirportName(displayName.replace('null', props.userAirportId));
    } else {
      setAirportName(displayName);
    }
  }
  
  useEffect(() => {
    setAirportData(props.airportData);
  }, [props.airportData]);

  return (
    <div className="airport-container">
      <h2>{airportId}</h2>
      <b>{airportName}</b>
      <p>{airportLatLong}</p>
      <b id="runway-title">Available Runways</b>
      <div className="runway-list">
        {
          availRunways.map(runway => {
              const {
                ident,
                name,
              } = runway;

              return (
                <ul key={runway.ident}>
                  <li>{name} ({ident})</li>
                </ul>
              );
          })
        }
      </div>
    </div>
  )
}

export default Airport;