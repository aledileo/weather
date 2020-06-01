import '../styles/index.css'
import SettingsContext, { defaultState } from '../context/SettingsContext';

function MyApp({ Component, pageProps }) {
  return (
    <SettingsContext.Provider value={defaultState}>
      <Component {...pageProps} />
    </SettingsContext.Provider>
  );
}

export default MyApp
