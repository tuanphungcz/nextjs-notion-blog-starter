import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';
import { useEffect } from 'react';

const useLogRocket = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      LogRocket.init(process.env.NEXT_PUBLIC_LOGROCKET_ID);
      // plugins should also only be initialized when in the browser
      setupLogRocketReact(LogRocket);
    }
  }, []);
};

export default useLogRocket;
