import TwitterHead, { GeneralHead } from 'components/OgMeta';
import Head from 'next/head';

export function MetaHead(props) {
  const { title, imageUrl, description, blog, ogUrl } = props;

  return (
    <Head>
      <title>{title || blog?.title}</title>
      <meta name="robots" content="follow, index" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <link rel="shortcut icon" href={blog?.profileUrl} />

      <GeneralHead
        description={description}
        ogUrl={ogUrl}
        ogImage={imageUrl}
        ogTitle={title}
      />

      <TwitterHead
        description={description}
        ogUrl={ogUrl}
        ogImage={imageUrl}
        ogTitle={title}
      />
    </Head>
  );
}
