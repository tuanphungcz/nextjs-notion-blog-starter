import type { AppProps } from 'next/app';
import Script from 'next/script';
import { Toaster } from 'react-hot-toast';
import 'styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {process.env.NEXT_PUBLIC_UMAMI_ID && process.env.NODE_ENV === 'production' && (
        <Script
          data-website-id={process.env.NEXT_PUBLIC_UMAMI_ID}
          src="https://umami-production-55de.up.railway.app/umami.js"
        />
      )}
      <Toaster />
      <Component {...pageProps} />;
    </>
  );
}
