import Sun from '../icons/sun.svg';

export default function Card({ weather }) {
  const { temp, description, dt } = weather;
  const time = (new Date(dt * 1000)).getHours();
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg w-5/6">
      <div className="flex items-center justify-between px-6 py-4 space-x-24">
        <div>
          <div className="font-bold text-3xl mb-2">{Math.round(temp)} °C</div>
          <p className="mb-2 capitalize">{description}</p>
          <p className="font-light">{time}.00 hs</p>
        </div>
        <Sun className="w-20 h-20"/>
      </div>
    </div>
  );
}
