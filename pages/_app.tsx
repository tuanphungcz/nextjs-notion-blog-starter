import 'react-notion/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css';
import NextNProgress from 'nextjs-progressbar';

import { SessionProvider } from 'next-auth/react';
import Script from 'next/script';
import { Toaster } from 'react-hot-toast';
import 'styles/globals.css';
import useLogRocket from 'hooks/useLogrocket';

export default function App({ Component, pageProps }: any) {
  useLogRocket();

  return (
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      {process.env.NEXT_PUBLIC_UMAMI_ID &&
        process.env.NEXT_PUBLIC_UMAMI_URL &&
        process.env.NODE_ENV === 'production' && (
          <Script
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_ID}
            src={process.env.NEXT_PUBLIC_UMAMI_URL}
          />
        )}
      <NextNProgress options={{ showSpinner: false }} />

      <Toaster />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
