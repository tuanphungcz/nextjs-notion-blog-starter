/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { convertToArticleList, getArticlePage, shuffleArray } from 'lib/notion';
import { Layout } from 'layouts/Layout';

import getLocalizedDate from 'lib/getLocalizedDate';
import prisma, { blogSelect } from 'lib/prisma';
import Container from 'components/base/Container';
import ArticleList from 'components/base/ArticleList';
import { getAllPosts, getPageById } from 'lib/posts';
import { NotionRenderer } from 'react-notion';

const ArticlePage = ({ summary, route, blog, blockMap, page, host, moreArticles }) => {
  const publishedOn = getLocalizedDate(page.published);

  // const slug = slugify(page.name).toLowerCase();

  // const ogImage = `https://${host}/api/og-image?title=${encodeURIComponent(
  //   page.name
  // )}&date=${encodeURIComponent(publishedOn)}`;

  const coverImage = (page?.coverImage?.length > 0 && page?.coverImage[0].url) || '';

  const routeSettings = blog.settingData?.links.find(setting =>
    setting?.url?.includes(route)
  );

  return (
    <>
      <Layout
        description={summary}
        // imageUrl={ogImage}
        blog={blog}
        title={page.name}
        ogUrl={`https://${host}`}
      >
        <div>
          <div
            className={`px-6 py-16 pb-48 mx-auto -mb-48 text-center ${
              coverImage && 'bg-gray-100'
            } md:pb-96 md:-mb-96`}
          >
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-center mb-2 space-x-2 text-sm text-gray-500">
                <div className="">{publishedOn}</div>
              </div>
              <div className="text-xl font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:text-w-4xl">
                {page.title}
              </div>
              <div className="max-w-3xl mx-auto mt-3 text-xl leading-8 text-gray-500 sm:mt-4">
                {page.summary}
              </div>
            </div>
          </div>

          <div className="max-w-5xl px-6 mx-auto my-8 md:px-8">
            {coverImage && (
              <img
                className="object-cover w-full mx-auto rounded-lg aspect-video"
                src={coverImage}
                // objectFit="cover"
                // placeholder="blur"
                // blurDataURL={coverImage}
                // layout="intrinsic"
                // width={1200}
                // height={684}
                // priority
                alt={'article cover'}
              />
            )}
          </div>

          <div className="max-w-4xl px-6 mx-auto mb-24 space-y-8 md:px-8">
            <NotionRenderer
              blockMap={blockMap}
              customBlockComponents={{
                text: ({ renderComponent, blockValue }) => {
                  return (
                    blockValue?.properties && (
                      <div className="leading-[32px] text-lg">{renderComponent()}</div>
                    )
                  );
                }
              }}
            />
          </div>
          <div className="py-12 border-t">
            <Container>
              <div className="flex items-center justify-between my-8">
                <div className="text-3xl font-bold text-gray-900 capitalize">{route}</div>
                <Link href="/">
                  <span className="font-semibold text-gray-900 cursor-pointer">
                    More {route} ➜
                  </span>
                </Link>
              </div>
              <ArticleList
                articles={moreArticles}
                routeSettings={routeSettings}
                route={route}
              />
            </Container>
          </div>
        </div>
      </Layout>
    </>
  );
};

export const getServerSideProps = async context => {
  const { site, slug, route } = context.query;
  const { headers } = context.req;

  const findOptions = site.includes('.') ? { customDomain: site } : { slug: site };

  const blog = await prisma.blogWebsite.findFirst({
    where: findOptions,
    select: blogSelect
  });

  const allPosts = await getAllPosts(blog.notionBlogDatabaseId);

  const page = getArticlePage(allPosts, slug);

  const blockMap = await getPageById(page.id);

  const { articles } = convertToArticleList(allPosts, route);

  return {
    props: {
      moreArticles: shuffleArray(articles).slice(0, 3),
      blog: {
        ...blog,
        settingData: JSON.parse(blog.settingData)
      },
      route,
      blockMap,
      page,
      host: headers.host
    }
  };
};

export default ArticlePage;
