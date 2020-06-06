import '../styles/index.css'
import SettingsContext, { defaultState } from '../context/SettingsContext';

function MyApp({ Component, pageProps }) {
  return (
    <SettingsContext.Provider value={defaultState}>
      <div className="flex flex-col items-center justify-center space-y-8 py-8">
        <Component {...pageProps} />
      </div>
    </SettingsContext.Provider>
  );
}

export default MyApp
