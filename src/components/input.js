import React, {useState} from 'react';

//khou kaus 50r egll
//khou, kaus, 50r, egll
//khou,kaus,50r,egll
//khou   kaus   50r   egll!
//khou|kaus|50r|egll
// const validateAiportIds = (input) => {
//   const splitLocations = findNonAlphaNumericIndex(input);
//   const validatedIds = [];

//   for (const i = 0; i < splitLocations.length; i++) {
//     if (i === 0 && splitLocations[i] > 0) {
//       validatedIds.push(input.substring(0, splitLocations[i]));
//     } else if (i < splitLocations.length - 1) {
//       validatedIds.push(input.substring(splitLocations[i], splitLocations[i + 1]));
//     }
//   }
//   splitLocations.map((splitLoc, currIdx) => {
//     input.substring(splitLoc)
//   })

//   input.replaceAll(' ', '').split(',');
// }
// const findNonAlphaNumericIndex = (str) => {
//   const locations = [];

//   for (const index in str) {
//     const charCode = str.charCodeAt(index);
//     if (
//       !(charCode >= 48 && charCode <= 57) &&
//       !(charCode >= 65 && charCode <= 90) &&
//       !(charCode >= 97 && charCode <= 122)
//     ) {
//       locations.push(index);
//     }
//   }
// }
const validateAiportIds = (input) => {
  return input.slice().replace(/[^a-zA-Z0-9]+/g, ' ').split(' ');
}

function Input(props) {
  const [airportInput, setAirportInput] = useState('');

  const handleUserInput = (event) => {
    setAirportInput(event.target.value);
  }

  const handleIdSubmission = (event) => {
    const userIdArray = validateAiportIds(airportInput);

    props.setUserAirportIds(userIdArray);    
    event.preventDefault();
  }

  return (
    <form onSubmit={handleIdSubmission}>
      <label>
        Please enter one or more airport identifiers:
        <input type="text" value={airportInput} onChange={handleUserInput}></input>
      </label>
      <input type="submit"></input>
    </form>
  )
}

export default Input;