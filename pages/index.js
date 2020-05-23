import Nav from '../components/nav';
import Card from '../components/card';

const data = [
  { temp: "12", message: "Light rain", time: "8" },
  { temp: "16", message: "Cloudy", time: "12" },
  { temp: "17", message: "Sunny", time: "16" },
  { temp: "13", message: "Clear", time: "20" },
];

export default function IndexPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-8">
      <div className="max-w-s">
        <h1 className="text-5xl">
          Hamburg
        </h1>
      </div>
      { data.map(weather => <Card weather={weather}/>) }
    </div>
  )
}
