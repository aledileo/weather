import Card from '../components/card';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function IndexPage() {
  const { data, error } = useSWR(() => '/api/forecast?lat=53.55&lon=10', fetcher, null);

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
