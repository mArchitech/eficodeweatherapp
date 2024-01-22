require('@babel/register');

import 'esm';
import { getWeatherFromApi, getForecastFromApi } from '../frontend/src/index.jsx';

describe('Weather API Tests', () => {
  it('should get weather data', async () => {
    const latitude = 60.2177536;
    const longitude = 24.9659392;
    const weatherData = await getWeatherFromApi(latitude, longitude);
    assert.ok(weatherData);
  });

  it('should get forecast data', async () => {
    const latitude = 60.2177536;
    const longitude = 24.9659392;
    const forecastData = await getForecastFromApi(latitude, longitude);
    assert.ok(forecastData);
  });
});
