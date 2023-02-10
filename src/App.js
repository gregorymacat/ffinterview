import React, {useState} from 'react';
import Airport from './components/airport';
import Weather from './components/weather';

// Main page info
// Input
// Airport Info (component)
// Weather Info (component)
// const airportIds = ['kaus', '50r', 'egll', 'khou'];

function App() {
  const [airportInput, setAirportInput] = useState('');
  const [userAirportIds, setUserAirportIds] = useState([]);
  
  const handleUserInput = (event) => {
    setAirportInput(event.target.value);
  }

  const handleIdSubmission = (event) => {
    console.log(airportInput);
    const userIdArray = airportInput.replaceAll(' ', '').split(',');

    console.log('This is the userIdArray: ', userIdArray)
    setUserAirportIds(userIdArray);

    event.preventDefault();
  }

  // useEffect(() => {
    
  // }, []);
  
  return (
    <div className="app">
      <h1>ForeFlight Interview</h1>
      <form onSubmit={handleIdSubmission}>
        <label>
          Please enter one or more airport identifiers:
          <input type="text" value={airportInput} onChange={handleUserInput}></input>
        </label>
        <input type="submit"></input>
      </form>
      
      {/* There will need to be a component that gathers this information for each
      input (firstInput div). The airport information can also be its own component, as will the weather.*/}
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
