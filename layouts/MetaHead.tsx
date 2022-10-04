import Head from 'next/head';

export function MetaHead(props) {
  const { date, title, imageUrl, description, ogUrl, blog } = props;

  const titleName = title || blog?.title;

  return (
    <Head>
      <title>{titleName}</title>
      <meta name="robots" content="follow, index" />
      <meta content={description || titleName} name="description" />
      <meta property="og:site_name" content={titleName} />
      <meta property="og:description" content={description} />
      <meta property="og:title" content={blog?.title} />
      <meta property="og:image" content={imageUrl || blog?.ogBanner} />

      <meta property="og:url" content={ogUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={titleName} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content={blog?.websiteUrl} />
      <meta property="twitter:url" content={ogUrl} />
      <meta name="twitter:title" content={titleName} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      {date && <meta property="article:published_time" content={date} />}
    </Head>
  );
}
