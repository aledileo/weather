import Sun from '../icons/sun.svg';

export default function Card({ weather }) {
  const { temp, message, time } = weather;
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <div className="flex items-center px-6 py-4 space-x-24">
        <div>
          <div className="font-bold text-3xl mb-2">{temp} °C</div>
          <p className="mb-2">{message}</p>
          <p className="font-light">{time} hs</p>
        </div>
        <Sun className="w-20 h-20"/>
      </div>
    </div>
  );
}
