import App from '@/components/App';
import '@/styles/globals.css';
import { NextUIProvider, createTheme } from '@nextui-org/react';

function MyApp({ Component, pageProps }) {
  const theme = createTheme({
    type: 'dark', // it could be "light" or "dark"
    theme: {
      colors: {
        primary: '#4ADE7B',
        secondary: '#F9CB80',
        error: '#FCC5D8',
      },
    },
  });

  return (
    <NextUIProvider theme={theme}>
      <App />
      <Component {...pageProps} />
    </NextUIProvider>
  );
}

export default MyApp;
