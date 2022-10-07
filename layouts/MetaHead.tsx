import TwitterHead, { GeneralHead } from 'components/OgMeta';
import Head from 'next/head';

export function MetaHead(props) {
  const { title, imageUrl, description, blog } = props;

  return (
    <Head>
      <title>{title || blog?.title}</title>
      <meta name="robots" content="follow, index" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      {/* OG Sharing Deets */}
      <GeneralHead
        description={description}
        ogUrl={'www.phung.io'}
        ogImage={imageUrl}
        ogTitle={title}
      />

      {/* Twitter Sharing Deets */}
      <TwitterHead
        description={description}
        ogUrl={'www.phung.io'}
        ogImage={imageUrl}
        ogTitle={title}
      />
    </Head>
  );
}
