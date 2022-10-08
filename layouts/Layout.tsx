import Subscribe from 'components/Subscribe';
import Footer from './Footer';
import Header from './Navbar';
import { MetaHead } from './MetaHead';

export function Layout(props) {
  const { children, imageUrl, description, ogUrl, blog, title } = props;

  const site = blog.settingData?.site;

  const formId = site?.convertkitFormid;
  const apiKey = site?.convertkitApiKey;

  const metaHeadProps = {
    imageUrl,
    description,
    ogUrl,
    title,
    blog
  };

  return (
    <>
      <MetaHead {...metaHeadProps} />
      <Header blog={blog} />
      <div className="pt-14">{children}</div>
      {formId && apiKey && <Subscribe />}
      <Footer blog={blog} />
    </>
  );
}
