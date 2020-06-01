import fetch from 'node-fetch';
import nextConnect from 'next-connect';
import middleware from '../../middleware';

const requiredParams = ['lat', 'lon'];
const apiKey = process.env.OPENWEATHER_API_KEY;
const baseUrl = process.env.OPENWEATHER_ONECALL_URL;

const handler = nextConnect();
handler.use(middleware);

async function getData(req) {

  if (!apiKey || !baseUrl) {
    console.log({ apiKey, baseUrl });
    throw new Error("Insufficient info to make the request");
  }

  const { lat, lon } = req.query;
  const url = `${baseUrl}?lat=${lat}&lon=${lon}&exclude=minutely,daily&appid=${apiKey}&units=metric`;

  if(!req.cache) {
    return (await fetch(url)).json();
  }

  if (await req.cache.exists(`${lat},${lon}`)) {
    return req.cache.getJson(`${lat},${lon}`);
  } else {
    const forecast = await (await fetch(url)).json();
    await req.cache.setJson(`${lat},${lon}`, forecast);
    return forecast;
  }

}

async function forecastHandler(req, res) {
  const hasRequiredParams = requiredParams.every(param => Boolean(req.query[param]));

  if (!hasRequiredParams) {
    res.status(400).json({
      message: 'Check your params!',
      params: req.query
    });
  }

  try {
    const forecast = await getData(req);
    
    const data = {
      city: 'Hamburg', // get city via lat/long with reverse geolocalization api
      hourly: forecast.hourly.map(({ dt, temp, weather }) => ({ dt, temp, main: weather[0].main, description: weather[0].description })).slice(1, 14),
      current: {
        dt: forecast.current.dt,
        temp: forecast.current.temp,
        main: forecast.current.weather[0].main,
        description: forecast.current.weather[0].description,
      }
    }
    
    res.status(200).json(data);
  } catch(e) {
    res.status(500).json({
      message: 'Lol, sorry. Something went wrong, check the logs',
      error: e
    })
  }
}

handler.get(forecastHandler);

export default handler;
