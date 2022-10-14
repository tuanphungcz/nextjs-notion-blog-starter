import NewTabLink from 'components/base/NewTabLink';
import { PageTransition } from 'components/PageTransition';
import BlogNavbar from './BlogNavbar';
import Footer from './Footer';
import { MetaHead } from './MetaHead';

export default function BlogLaylout({
  children,
  blog,
  description,
  ogImage,
  baseUrl,
  icon,
  title
}: any) {
  const metaHeadProps = {
    title,
    ogImage,
    description,
    baseUrl,
    icon
  };

  return (
    <>
      <MetaHead {...metaHeadProps} />
      <div className="pb-24 bg-gray-100">
        <div className="max-w-5xl px-6 mx-auto bg-white sm:px-16 md:px-24">
          <BlogNavbar blog={blog} />
        </div>

        <div className="max-w-5xl px-6 py-4 pt-16 mx-auto tracking-tight bg-white rounded-b-xl sm:px-16 md:px-24">
          <PageTransition>
            {children}
            <Footer blog={blog} />
          </PageTransition>
        </div>
        <NewTabLink
          href="https://blogfolio.co/"
          className="flex justify-center text-center"
        >
          <div className="px-4 py-2 mt-4 text-xs text-gray-400 transition hover:text-gray-500 rounded-xl hover:bg-gray-200">
            Powered by Blogfolio.co
          </div>
        </NewTabLink>
      </div>
    </>
  );
}
