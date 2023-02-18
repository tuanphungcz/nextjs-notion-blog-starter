import { createContext, ReactNode, useEffect, useState } from 'react';

type ThemeContextProps = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};
type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeContext = createContext<ThemeContextProps>({
  theme: 'dark',
  toggleTheme: () => {}
});

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const toggleTheme = () => {
    const html = document.querySelector('html');
    const currentTheme = html.classList[0];
    if (currentTheme === 'dark') {
      html.classList.remove('dark');
      setTheme('light');
      localStorage.setItem('theme', 'light');
    } else if (currentTheme === undefined) {
      html.classList.add('dark');
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  useEffect(() => {
    const html = document.querySelector('html');
    if (!localStorage.theme) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        {
          html.classList.add('dark');
          setTheme('dark');
          localStorage.setItem('theme', 'dark');
        }
      } else {
        html.classList.remove('dark');
        setTheme('light');
        localStorage.setItem('theme', 'light');
      }
    } else if (localStorage.theme) {
      const lastSelectedTheme = localStorage.theme;
      if (lastSelectedTheme === 'dark') {
        {
          html.classList.add('dark');
          setTheme('dark');
          localStorage.setItem('theme', 'dark');
        }
      } else {
        html.classList.remove('dark');
        setTheme('light');
        localStorage.setItem('theme', 'light');
      }
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
