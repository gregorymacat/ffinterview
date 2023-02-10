import React, {useState} from 'react';
import Input from './components/input';
import Airport from './components/airport';
import Weather from './components/weather';

// Main page info
// Input
// Airport Info (component)
// Weather Info (component)
// const airportIds = ['kaus', '50r', 'egll', 'khou'];

function App() {
  const [userAirportIds, setUserAirportIds] = useState([]);
  
  return (
    <div className="app">
      <h1>ForeFlight Interview</h1>
      <Input setUserAirportIds={setUserAirportIds}/>
        {userAirportIds.map(userAirportId => (
          <div className="data-container">
            <Airport key={`aidinfo-${userAirportId}`} userAirportId={userAirportId}/>
            <div>
              <h1>Weather Report:</h1>
              <Weather key={`aidweather-${userAirportId}`} userAirportId={userAirportId}/>
            </div>
          </div>
        ))}
    </div>
  );
}

export default App;
