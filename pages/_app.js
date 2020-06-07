import '../styles/index.css';
import Head from 'next/head';
import SettingsContext, { defaultState } from '../context/SettingsContext';
import IconsCopyright from '../components/IconsCopyright';

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Head>
      <meta charSet='utf-8' />
      <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
      <meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5' />
      <meta name='description' content='Weather app' />
      <meta name='keywords' content='weather' />
      <title>Weather</title>

      <link rel='manifest' href='/manifest.json' />
      <link href='/icons/favicon-16x16.png' rel='icon' type='image/png' sizes='16x16' />
      <link href='/icons/favicon-32x32.png' rel='icon' type='image/png' sizes='32x32' />
      <link rel='apple-touch-icon' href='/icons/apple-icon.png'></link>
      <meta name='theme-color' content='#000' />
    </Head>
    <SettingsContext.Provider value={defaultState}>
      <div className="flex flex-col items-center justify-center space-y-8 py-8">
        <Component {...pageProps} />
        <IconsCopyright />
      </div>
    </SettingsContext.Provider>
    </>
  );
}

export default MyApp
