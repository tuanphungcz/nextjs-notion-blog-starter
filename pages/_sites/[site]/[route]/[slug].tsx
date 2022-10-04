import { Fragment } from 'react';
import Link from 'next/link';
import { getAllArticles, getArticlePage, getArticlePageData } from 'lib/notion';
import { Layout } from 'layouts/Layout';
import Image from 'next/image';
import { renderBlocks } from 'components/notionBlocks/renderBlocks';
import getLocalizedDate from 'lib/getLocalizedDate';
import Container from 'components/base/Container';
import slugify from 'slugify';
import ArticleList from 'components/base/ArticleList';
import prisma, { blogSelect } from 'lib/prisma';

const ArticlePage = ({
  content,
  title,
  coverImage,
  publishedDate,
  lastEditedAt,
  summary,
  route,
  moreArticles,
  blog
}) => {
  const publishedOn = getLocalizedDate(publishedDate);
  const modifiedDate = getLocalizedDate(lastEditedAt);

  const slug = slugify(title).toLowerCase();

  const ogImage = `${blog?.websiteUrl}/api/og-image?title=${encodeURIComponent(
    title
  )}&date=${encodeURIComponent(publishedOn)}`;

  const hasCoverImage = blog?.coverImage === '/image-background.png';

  return (
    <>
      <Layout
        description={summary}
        imageUrl={ogImage}
        date={new Date(publishedDate).toISOString()}
        ogUrl={`/${slug}`}
        blog={blog}
      >
        <div>
          <div className="px-6 py-16 pb-48 mx-auto -mb-48 text-center bg-gray-100 md:pb-96 md:-mb-96">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-center mb-2 space-x-2 text-sm text-gray-500">
                <div className="">{publishedOn}</div>
                {publishedOn !== modifiedDate && (
                  <>
                    <span className="">•</span>
                    <span className="0">Updated on {modifiedDate}</span>
                  </>
                )}
              </div>
              <div className="text-xl font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:text-w-4xl">
                {title}
              </div>
              <div className="max-w-3xl mx-auto mt-3 text-xl leading-8 text-gray-500 sm:mt-4">
                {summary}
              </div>
            </div>
          </div>

          <div className="max-w-5xl px-6 mx-auto my-16 md:px-8">
            {hasCoverImage && (
              <Image
                className="rounded-lg aspect-video"
                objectFit="cover"
                src={coverImage}
                placeholder="blur"
                blurDataURL={coverImage}
                layout="intrinsic"
                width={1200}
                height={684}
                alt={'article cover'}
                priority
              />
            )}
          </div>

          <div className="max-w-4xl px-6 mx-auto mb-24 space-y-8 md:px-8">
            {content.map(block => (
              <Fragment key={block.id}>{renderBlocks(block)}</Fragment>
            ))}
          </div>
          <div className="py-12 border-t">
            <Container>
              <div className="flex items-center justify-between my-8">
                <div className="text-3xl font-bold text-gray-900">Latest {route}</div>
                <Link href="/">
                  <span className="font-semibold text-gray-900 cursor-pointer">
                    More {route} ➜
                  </span>
                </Link>
              </div>
              <ArticleList articles={moreArticles} />
            </Container>
          </div>
        </div>
      </Layout>
    </>
  );
};

export const getServerSideProps = async context => {
  const { site, slug, route } = context.query;

  const findOptions = site.includes('.') ? { customDomain: site } : { slug: site };

  const blog = await prisma.blogWebsite.findFirst({
    where: findOptions,
    select: blogSelect
  });

  const data = await getAllArticles(blog.notionBlogDatabaseId, blog.notionSecret, '');
  const page = getArticlePage(data, slug);
  const result = await getArticlePageData(
    page,
    slug,
    blog.notionBlogDatabaseId,
    blog.notionSecret,
    route
  );

  return {
    props: {
      ...result,
      blog,
      route
    }
  };
};

export default ArticlePage;
