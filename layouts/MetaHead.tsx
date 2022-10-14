import TwitterHead, { GeneralHead } from 'components/OgMeta';
import Head from 'next/head';

export function MetaHead(props) {
  const { title, ogImage, description, baseUrl, icon } = props;

  return (
    <Head>
      <title>{title}</title>
      <meta name="robots" content="follow, index" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <link rel="shortcut icon" href={icon} />

      <GeneralHead
        description={description}
        ogUrl={baseUrl}
        ogImage={ogImage}
        ogTitle={title}
      />

      <TwitterHead
        description={description}
        ogUrl={baseUrl}
        ogImage={ogImage}
        ogTitle={title}
      />
    </Head>
  );
}
