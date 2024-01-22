import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const baseURL = process.env.ENDPOINT || 'http://localhost:9000/api';

const getWeatherFromApi = async (latitude, longitude) => {
  try {
    const response = await fetch(`${baseURL}/weather?lat=${latitude}&lon=${longitude}&appid=79eb02c79c2334989ead62df62f7186e`);
    return response.json();
  } catch (error) {
    console.error(error);
  return {};
  }
};

const getForecastFromApi = async (latitude, longitude) => {
  try {
    const response = await fetch(`${baseURL}/forecast?lat=${latitude}&lon=${longitude}&appid=79eb02c79c2334989ead62df62f7186e`);
    return response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

const Weather = () => {
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
	try {
   	 const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;

  	console.log('Fetching weather data...');
        const weatherData = await getWeatherFromApi(latitude, longitude);
        console.log('Weather Data:', weatherData);


        console.log('Fetching forecast data...');
        const forecastData = await getForecastFromApi(latitude, longitude);
        console.log('Forecast Data:', forecastData);

      setWeather(weatherData);
      setForecast(forecastData);
	} catch (error) {
        console.error(error);
        setError("Weather data Error. Please check settings.");
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="icon">
        {weather.icon && <img src={`/img/${weather.icon.slice(0, -1)}.svg`} alt="Weather Icon" />}
      </div>

      <div>
        <h2>Forecast</h2>
        <ul>
          {forecast.map((item, index) => (
            <li key={index}>{/* Display forecast information as needed */}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

ReactDOM.render(
  <Weather />,
  document.getElementById('app')
);
