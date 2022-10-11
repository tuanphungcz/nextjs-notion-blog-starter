import 'react-notion/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css';
import NProgress from 'nprogress';

import { SessionProvider } from 'next-auth/react';
import Script from 'next/script';
import { Toaster } from 'react-hot-toast';
import 'styles/globals.css';
import { Router } from 'next/router';

Router.events.on('routeChangeStart', url => {
  NProgress.start();
});

Router.events.on('routeChangeComplete', url => {
  NProgress.done(false);
});

NProgress.configure({ showSpinner: false });

export default function App({ Component, pageProps }: any) {
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
      <Toaster />
      <Component {...pageProps} />;
    </SessionProvider>
  );
}
