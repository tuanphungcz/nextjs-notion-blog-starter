import 'react-notion/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css';
import NextNProgress from 'nextjs-progressbar';

import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import 'styles/globals.css';
import useLogRocket from 'hooks/useLogrocket';

export default function App({ Component, pageProps }: any) {
  useLogRocket();

  return (
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      <NextNProgress options={{ showSpinner: false }} />
      <Toaster />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
