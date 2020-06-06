import { useContext, useCallback, useMemo } from 'react';
import Card from '../components/card';
import Loading from '../components/Loading';
import Error from '../components/Error';
import useSWR from 'swr';
import qs from 'query-string';
import SettingsContext from '../context/SettingsContext';
import fetcher from '../helpers/fetcher';

function Title({ text }) {
  return (
    <div className="max-w-lg">
       <h1 className="text-5xl">
         {text}
       </h1>
     </div>
  );
}

export default function IndexPage() {
  const { enabledHours } = useContext(SettingsContext);
  const qparams = { lat: 53.55, lon: 10, enabledHours };
  const querystring = useMemo(() => qs.stringify(qparams), [enabledHours]);
  const { data, error } = useSWR(() => `/api/forecast?${querystring}`, fetcher, null);

  if (error) return <Error />
  if (!data) return <Loading />
  return (
    <>
      <Title text={data.city} />
      <Card weather={data.current} />
      { data.hourly.map(weather => <Card key={weather.dt} weather={weather}/>) }
    </>
  )
}
