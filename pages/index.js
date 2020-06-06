import { useContext, useCallback, useMemo } from 'react';
import Card from '../components/card';
import useSWR from 'swr';
import qs from 'query-string';
import SettingsContext from '../context/SettingsContext';
import fetcher from '../helpers/fetcher';


export default function IndexPage() {
  const { enabledHours } = useContext(SettingsContext);
  const qparams = { lat: 53.55, lon: 10, enabledHours };
  const querystring = useMemo(() => qs.stringify(qparams), [enabledHours]);
  const { data, error } = useSWR(() => `/api/forecast?${querystring}`, fetcher, null);

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-8">
      <div className="max-w-lg">
        <h1 className="text-5xl">
          {data.city}
        </h1>
      </div>
      <Card weather={data.current} />
      { data.hourly.map(weather => <Card key={weather.dt} weather={weather}/>) }
    </div>
  )
}
