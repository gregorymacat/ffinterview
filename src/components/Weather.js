import React, {useEffect, useState} from 'react';

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
  const [visibility, setVisibility] = useState('');
  const [windSpeed, setWindSpeed] = useState('');
  const [windDirection, setWindDirection] = useState('');

  const setWeatherData = (allWeatherInfo) => {
    if (!allWeatherInfo.report) {
      return;
    }
    const availableWeatherData = allWeatherInfo.report.conditions || 
      allWeatherInfo.report.forecast.conditions[0];
    const {
      tempC = 0,
      relativeHumidity: relHumidity = 0,
      cloudLayers = [],
      cloudLayersV2 = [],
      visibility = {},
      wind = {},
    } = availableWeatherData;

    const tempF = (tempC * 1.8) + 32;
    const worstCoverage = getWorstCloudConditions(cloudLayers, cloudLayersV2);
    const windSpeedMph = wind.speedKts * 1.151 || 'N/A';
    const windDir = wind.direction ? calculateWindDirection(wind.direction) : 'N/A';

    setTemperature(`${Math.round(tempF * 100) / 100}°`);
    setRelativeHumidity(relHumidity);
    setCloudCoverage(worstCoverage.coverage);
    setVisibility(visibility.distanceSm || 0);
    setWindSpeed(Math.round(windSpeedMph * 100) / 100);
    setWindDirection(windDir);
  }

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

  useEffect(() => {
    setWeatherData(props.weatherData);
  }, [props.weatherData]);
 
  return (
    <div className="weather-container">
      <h2>Weather</h2>
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