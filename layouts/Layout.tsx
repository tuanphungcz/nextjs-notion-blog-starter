import { useContext } from 'react';
import Subscribe from 'components/Subscribe';
import Footer from './Footer';
import Header from './Navbar';
import { MetaHead } from './MetaHead';
import { ThemeContext } from 'context/ThemeContext';

const FORM_ID = process.env.NEXT_PUBLIC_CONVERTKIT_FORM_ID;
const API_KEY = process.env.NEXT_PUBLIC_CONVERTKIT_API_KEY;

export function Layout(props) {
  const { children, date, imageUrl, title, description, ogUrl } = props;
  const metaHeadProps = {
    date,
    imageUrl,
    description,
    ogUrl,
    title
  };

  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <>
      <MetaHead {...metaHeadProps} />
      <Header />
      <div className="pt-14">{children}</div>
      {FORM_ID && API_KEY && <Subscribe />}

      <Footer />
      <button
        type="button"
        onClick={toggleTheme}
        className="fixed bottom-0 right-0 text-sm bg-slate-900 text-white rounded-md m-4 px-5 py-2 dark:bg-slate-100 dark:text-slate-800 sm:text-l md:text-xl z-20"
      >
        {theme === 'light' ? 'Dark' : 'Light'}
      </button>
    </>
  );
}
