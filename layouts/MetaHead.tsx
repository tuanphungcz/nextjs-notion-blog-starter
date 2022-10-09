import TwitterHead, { GeneralHead } from 'components/OgMeta';
import Head from 'next/head';

export function MetaHead(props) {
  const { title, imageUrl, description, blog, baseUrl } = props;

  const site = blog.settingData?.site;

  return (
    <Head>
      <title>{title || site?.blogName}</title>
      <meta name="robots" content="follow, index" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <link rel="shortcut icon" href={site?.profileUrl} />

      <GeneralHead
        description={description}
        ogUrl={baseUrl}
        ogImage={imageUrl}
        ogTitle={title}
      />

      <TwitterHead
        description={description}
        ogUrl={baseUrl}
        ogImage={imageUrl}
        ogTitle={title}
      />
    </Head>
  );
}
