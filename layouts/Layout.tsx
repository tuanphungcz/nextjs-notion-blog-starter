import Subscribe from 'components/Subscribe';
import Footer from './Footer';
import Header from './Navbar';
import { MetaHead } from './MetaHead';

export function Layout(props) {
  const { children, date, imageUrl, description, ogUrl, blog } = props;

  const FORM_ID = blog.convertkitFormid;
  const API_KEY = blog.convertkitApiKey;

  const metaHeadProps = {
    date,
    imageUrl,
    description,
    ogUrl,
    blog
  };

  return (
    <>
      <MetaHead {...metaHeadProps} />
      <Header blog={blog} />
      <div className="pt-14">{children}</div>
      {FORM_ID && API_KEY && <Subscribe />}

      <Footer blog={blog} />
    </>
  );
}
