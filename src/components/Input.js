import React, {useState} from 'react';

const validateAiportIds = (input) => {
  const regex = /(\W+)/g
  const regexResult = input.slice().replace(regex, ',');
  const arr = regexResult.split(',');
  return arr;
}

function Input(props) {
  const [airportInput, setAirportInput] = useState('');

  const handleUserInput = (event) => {
    setAirportInput(event.target.value);
  }

  const handleIdSubmission = (event) => {
    const userIdArray = validateAiportIds(airportInput);
    console.log('UserIdArray: ', userIdArray)
    props.setUserAirportIds(userIdArray);
    
    event.preventDefault();
  }

  return (
    <div className="airportid-input-container">
      <h2>ForeFlight Interview</h2>
      <form onSubmit={handleIdSubmission}>
        <input type="text" placeholder="Enter one or more airport identifiers..."
          value={airportInput} onChange={handleUserInput}></input>
        <button className="material-symbols-outlined" onClick={handleIdSubmission}>chevron_right</button>
      </form>
    </div>
    
  )
}

export default Input;