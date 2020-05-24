import fetch from 'node-fetch';
import nextConnect from 'next-connect';
import middleware from '../../middleware/cache';

const requiredParams = ['lat', 'lon'];

const handler = nextConnect();
handler.use(middleware);

async function forecastHandler(req, res) {
  const hasRequiredParams = requiredParams.every(param => Boolean(req.query[param]));

  if (!hasRequiredParams) {
    res.status(400).json({
      message: 'Check your params!',
      params: req.query
    });
  }

  const { lat, lon } = req.query;
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const baseUrl = process.env.NEXT_PUBLIC_OPENWEATHER_ONECALL_URL;
  const url = `${baseUrl}?lat=${lat}&lon=${lon}&exclude=minutely,daily&appid=${apiKey}&units=metric`;
  const forecast = await (await fetch(url)).json();

  const data = {
    city: 'Hamburg', // get city via lat/long with reverse geolocalization api
    hourly: forecast.hourly.map(({ dt, temp, weather }) => ({ dt, temp, main: weather[0].main, description: weather[0].description })).slice(0, 14),
  }

  res.status(200).json(data);
}

handler.get(forecastHandler);

export default handler;
