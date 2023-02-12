import React, {useState} from 'react';
import Input from './components/Input';
import Tiles from './components/Tiles';

function App() {
  const [userAirportIds, setUserAirportIds] = useState([]);
  
  return (
    <div className="app">
      <Input setUserAirportIds={setUserAirportIds}/>
      <Tiles userAirportIds={userAirportIds}/>    
    </div>
  );
}

export default App;
