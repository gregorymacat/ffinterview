import React from 'react';
import InfoTile from './InfoTile';

function Tiles(props) {
  return (
    <div className="tiles-container">
      {
        props.userAirportIds.map(userAirportId => (
          <InfoTile airportId={userAirportId}/>
        ))
      }
    </div>
  );
}

export default Tiles;
