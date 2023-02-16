import { useCallback, useEffect, useState } from 'react';

export default function useTheme() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const toggleTheme = useCallback(() => {
    const currentTheme = document.documentElement.classList[0];
    if (currentTheme === 'dark') {
      document.documentElement.classList.remove(currentTheme);
      setTheme('light');
      localStorage.setItem('theme', 'light');
    } else if (currentTheme === undefined) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    if (!localStorage.theme) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        {
          document.documentElement.classList.add('dark');
          setTheme('dark');
        }
      } else {
        document.documentElement.classList.remove('dark');
        setTheme('light');
      }
    } else if (localStorage.theme) {
      const lastSelectedTheme = localStorage.theme;
      if (lastSelectedTheme === 'dark') {
        {
          document.documentElement.classList.add('dark');
          setTheme('dark');
        }
      } else {
        document.documentElement.classList.remove('dark');
        setTheme('light');
      }
    }
  }, []);

  return { theme, toggleTheme };
}
