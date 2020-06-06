import Sun from '../icons/sun.svg';

export default function Loading() {
  return (
    <>
    <Sun id="spinner" className="w-40 h-40"/>
    <h2>Checking the weather</h2>
    <style>{`
      @keyframes rotation {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      #spinner {
        animation: rotation 1.8s infinite ease-in-out;
      }
    `}</style>
    </>
  );
}
