import Link from 'next/link';
import { filterArticlesWithMetadata, getArticlePage, shuffleArray } from 'lib/notion';
import { Layout } from 'layouts/Layout';
import getLocalizedDate from 'lib/getLocalizedDate';
import prisma, { blogSelect } from 'lib/prisma';
import Container from 'components/base/Container';
import ArticleList from 'components/base/ArticleList';
import { getAllPosts, getPageById } from 'lib/posts';
import { NotionRenderer } from 'react-notion';
import { flattenDeep, getSiteOptions } from 'lib/utils';
import { IconChevronRight } from '@tabler/icons';
import { useRouter } from 'next/router';
import slugify from 'slugify';

const ArticlePage = ({ summary, route, blog, blockMap, page, origin, moreArticles }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div />;
  }

  const publishedOn = getLocalizedDate(page.published);

  const ogImage = `https://blogfolio.co/api/og?title=${encodeURIComponent(
    page.title
  )}&domain=${encodeURIComponent(blog?.customDomain || blog?.slug + '.blogfolio.co')}`;

  const coverImage = page?.coverImage?.[0].url || '';

  const routeSettings = blog.settingData?.links.find(setting =>
    setting?.url?.includes(route)
  );

  return (
    <>
      <Layout
        description={summary}
        imageUrl={ogImage}
        blog={blog}
        title={page.title}
        baseUrl={origin}
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
                alt="article cover"
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

                <Link href={`/${route}`}>
                  <span className="relative flex justify-center">
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 space-x-2 text-sm font-medium text-center text-gray-700 transition bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer hover:bg-gray-50 hover:opacity-90"
                    >
                      <div> More {route}</div>
                      <IconChevronRight className="w-4" />
                    </button>
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

export async function getStaticPaths() {
  const blogs = await prisma.blogWebsite.findMany({
    select: {
      customDomain: true,
      slug: true,
      notionBlogDatabaseId: true
    }
  });

  const x = await Promise.all(
    blogs.map(async blog => {
      const allPosts = await getAllPosts(blog?.notionBlogDatabaseId);
      let articles: any[] = [];

      allPosts.forEach((article: any) => {
        articles.push({
          route: article?.route,
          slug: slugify(article?.title).toLowerCase()
        });
      });

      return articles
        .filter(item => item?.route)
        .map(article => ({
          route: article.route,
          slug: article.slug,
          subdomain: blog.slug,
          customDomain: blog.customDomain
        }));
    })
  );

  const flattenBlogs = flattenDeep(x);

  const paths = flattenBlogs.flatMap(blog => {
    if (blog?.subdomain === null || blog?.customDomain === null) return [];

    if (blog.customDomain) {
      return [
        {
          params: {
            site: blog.customDomain,
            route: blog.route,
            slug: blog.slug
          }
        },
        {
          params: {
            site: blog.subdomain,
            route: blog.route,
            slug: blog.slug
          }
        }
      ];
    } else {
      return {
        params: {
          site: blog.subdomain,
          route: blog.route,
          slug: blog.slug
        }
      };
    }
  });

  return {
    paths: paths,
    fallback: true
  };
}
export const getStaticProps = async context => {
  const { site, slug, route } = context.params;

  const blog = await prisma.blogWebsite.findFirst({
    where: getSiteOptions(site),
    select: blogSelect
  });

  const allPosts = await getAllPosts(blog.notionBlogDatabaseId);
  const { articles } = filterArticlesWithMetadata(allPosts, route);

  const page = getArticlePage(allPosts, slug);
  const blockMap = await getPageById(page.id);

  return {
    props: {
      moreArticles: shuffleArray(articles).slice(0, 3),
      blog: {
        ...blog,
        settingData: JSON.parse(blog.settingData)
      },
      route,
      blockMap,
      page
      // origin
    },
    revalidate: 60
  };
};

export default ArticlePage;
