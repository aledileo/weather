import fetch from 'node-fetch';

const requiredParams = ['lat', 'lon'];

async function forecastHandler(req, res) {

  if (req.method !== 'GET') {
    res.status(405).json({
      message: `Sorry! ${req.method} is not implemented`
    });
  }

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

export default forecastHandler;
