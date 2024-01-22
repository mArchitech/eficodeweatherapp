// const debug = require('debug',)('weathermap',);

const Koa = require('koa',);
const router = require('koa-router',)();
const fetch = require('node-fetch',);
const cors = require('kcors',);

const appId = process.env.APPID || '79eb02c79c2334989ead62df62f7186e';
const mapURI = process.env.MAP_ENDPOINT || 'http://api.openweathermap.org/data/2.5';
const targetCity = process.env.TARGET_CITY || 'Helsinki.fi';

const port = process.env.PORT || 9000;

const app = new Koa();

app.use(cors(),);

const fetchWeather = async () => {
  const weatherEndpoint = `${mapURI}/weather?q=${targetCity}&appid=${appId}&`;
  const forecastEndpoint = `${mapURI}/forecast?q=${targetCity}&appid=${appId}&`;

  const [weatherResponse, forecastResponse,] = await Promise.all([
    fetch(weatherEndpoint,),
    fetch(forecastEndpoint,),
  ],);
  const weatherData = weatherResponse ? await weatherResponse.json() : {};
  const forecastData = forecastResponse ? await forecastResponse.json() : {};

  return {
    weather: weatherData.weather ? weatherData.weather[0] : {},
    forecast: forecastData.list || [],
  };
};

router.get('/api/weather', async function (ctx,) {
  const weatherData = await fetchWeather();

  ctx.type = 'application/json; charset=utf-8';
  ctx.body = weatherData;
},);

app.use(router.routes(),);
app.use(router.allowedMethods(),);

app.listen(port,);

console.log(`App listening on port ${port}`,);
