import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

interface PageTransitionProps {
  children?: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const router = useRouter();

  return (
    <motion.div
      key={router.route + router.asPath}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ type: 'linear', duration: 0.5 }}
      variants={{
        hidden: { opacity: 0 },
        enter: { opacity: 1 },
        exit: { opacity: 0 }
      }}
    >
      {children}
    </motion.div>
  );
};
