import React, {useEffect, useState} from 'react';
import axios from 'axios';

// Sec 5: current weather report
  // 5.1: Temp (in Farenheit)
  // 5.2: Relative Humidity (%)
  // 5.4: Summary of cloud coverage (text string)
    // 5.4.1: Greatest amount if any listed
  // 5.5: Visibility (Statute Miles)
  // Wind Speed (MPH)
  // Wind Direction (cardinal to secondary intercardinal precision)
const cloudCoverageTranslation = {
  clr: 'Clear Skies',
  skc: 'Clear Skies',
  few: 'Few Clouds',
  sct: 'Scattered Clouds',
  bkn: 'Broken Clouds',
  ovc: 'Overcast',
}
const cloudCoverageCodes = {
  clr: 0,
  skc: 0,
  few: 0.25,
  sct: 0.5,
  bkn: 0.75,
  ovc: 1,
}

const calculateWindDirection = (degrees) => {
  const sectors = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];
  const degreeIndex = Math.round(degrees / 45);

  return sectors[degreeIndex];
}

function Weather(props) {
  const [temperature, setTemperature] = useState('');
  const [relativeHumidity, setRelativeHumidity] = useState('');
  const [cloudCoverage, setCloudCoverage] = useState('');
  const [visibility, setVisibility] = useState();
  const [windSpeed, setWindSpeed] = useState();
  const [windDirection, setWindDirection] = useState('');

  const getWorstCloudConditions = (coverCode, coverCodeV2) => {
    const worstCoverage = {};

    const compareCloudConditions = (coverCodeVersion) => {
      coverCodeVersion.forEach(layer => {
        if (!worstCoverage.coverage || cloudCoverageCodes[layer.coverage] > worstCoverage.coverage) {
          worstCoverage.coverage = cloudCoverageTranslation[layer.coverage] || 'N/A';
          worstCoverage.altitudeFt = layer.altitudeFt;
          worstCoverage.ceiling = layer.ceiling;
  
          if (layer.type) worstCoverage.type = layer.type;
        }
      })
    }
    
    compareCloudConditions(coverCode);
    compareCloudConditions(coverCodeV2);
    
    return worstCoverage;
  }

  const getWeatherData = (id) => {
    axios({
        method: 'get',
        url: `http://localhost:3000/weather/${id}.json`,
    })
      .then((response) => {
        console.log('This is the response: ', response.data);
        const {
          tempC,
          relativeHumidity: relHumidity,
          cloudLayers,
          cloudLayersV2,
          visibility,
          wind,
        } = response.data.report.conditions;
        const tempF = (tempC * 1.8) + 32;
        const worstCoverage = getWorstCloudConditions(cloudLayers, cloudLayersV2);
        const windSpeedMph = wind.speedKts * 1.151;
        const windDir = calculateWindDirection(wind.direction);

        setTemperature(Math.round(tempF * 100) / 100);
        setRelativeHumidity(relHumidity);
        setCloudCoverage(worstCoverage.coverage);
        setVisibility(visibility.distanceSm);
        setWindSpeed(Math.round(windSpeedMph * 100) / 100);
        setWindDirection(windDir);
      })
      .catch((err) => {
        return err;
      });
  }

  useEffect(() => {
    getWeatherData(props.userAirportId);
  }, [props.userAirportId]);

  return (
    <div className="weather-container">
      <p>Temperature: {temperature}F</p>
      <p>Relative Humidity: {relativeHumidity}%</p>
      <p>Cloud Coverage: {cloudCoverage}</p>
      <p>Visibility: {visibility} Statute Miles</p>
      <p>Wind Speed: {windSpeed} MPH</p>
      <p>Wind Direction: {windDirection}</p>
    </div>
  )
}

export default Weather;