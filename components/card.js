import Sun from '../icons/sun.svg';

function formatTime(dt) {
  const time = new Date(dt * 1000);
  const hours = time.getHours().toString().length === 1 ? `0${time.getHours()}`: time.getHours();
  const minutes = time.getMinutes().toString().length === 1 ? `0${time.getMinutes()}`: time.getMinutes();
  return `${hours}.${minutes} hs`;
}

function isTomorrow (dt) {
  const date = new Date(dt * 1000);
  const today = new Date();
  console.log(date.getDate(), today.getDate() + 1)
  return date.getDate() === today.getDate() + 1
}

export default function Card({ weather }) {
  const { temp, description, dt } = weather;
  const time = formatTime(dt);
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg w-full">
      <div className="flex items-center justify-between px-6 py-4 space-x-24">
        <div>
          <div className="font-bold text-3xl mb-2">{Math.round(temp)} °C</div>
          <p className="mb-2 capitalize">{description}</p>
          <p className="inline-block font-light bg-black text-white px-2 rounded mb-2">{time}</p>
            { isTomorrow(dt) && <p className="font-light text-gray-700">Tomorrow</p> }
        </div>
        <Sun className="w-20 h-20"/>
      </div>
    </div>
  );
}
