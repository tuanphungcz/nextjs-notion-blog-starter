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
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
        integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />

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
