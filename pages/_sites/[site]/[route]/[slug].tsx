import Link from 'next/link';
import { filterArticlesWithMetadata, getArticlePage, shuffleArray } from 'lib/notion';
import getLocalizedDate from 'lib/getLocalizedDate';
import prisma, { blogSelect } from 'lib/prisma';
import ArticleList from 'components/base/ArticleList';
import { getAllPosts, getPageById } from 'lib/posts';
import { NotionRenderer } from 'react-notion';
import { getSiteOptions } from 'lib/utils';
import { IconChevronRight } from '@tabler/icons';
import { SecondaryButton } from 'components/base/Button';
import BlogLaylout from 'layouts/BlogLayout';

const ArticlePage = ({ route, blog, blockMap, page, moreArticles }) => {
  console.log(blog);
  const publishedOn = getLocalizedDate(page.published);

  const ogImage = `${
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : `https://${process.env.NEXT_PUBLIC_APP_DOMAIN_URL}`
  }/api/og?title=${encodeURIComponent(page.title)}&domain=${encodeURIComponent(
    blog?.customDomain || blog?.slug + process.env.NEXT_PUBLIC_APP_DOMAIN_URL
  )}`;

  const coverImage = page?.coverImage?.[0].url || '';

  const routeSettings = blog.settingData?.links.find(setting =>
    setting?.url?.includes(route)
  );

  return (
    <BlogLaylout
      blog={blog}
      ogImage={ogImage}
      title={blog.title}
      description={blog.summary}
      icon={blog.settingData?.site?.profileUrl}
      baseUrl={null}
    >
      <div className="max-w-2xl mx-auto">
        <div className="mb-4 text-lg text-gray-500">{publishedOn}</div>
        <div className=" font-extrabold tracking-tight text-gray-900 text-3xl sm:text-5xl sm:leading-[56px]">
          {page.title}
        </div>
        <div className="mx-auto mt-6 text-lg notion-text sm:mt-4">{page.summary}</div>

        {coverImage && (
          <img
            className="object-cover w-full mx-auto my-8 rounded-lg aspect-video"
            src={coverImage}
            alt="article cover"
          />
        )}

        <NotionRenderer
          blockMap={blockMap}
          customBlockComponents={{
            text: ({ renderComponent, blockValue }) =>
              blockValue?.properties && <div className="">{renderComponent()}</div>
          }}
        />
      </div>
      <div className="py-12 mt-12 border-t">
        <div className="flex items-center justify-between my-8">
          <div className="text-3xl font-bold text-gray-900 capitalize">{route}</div>

          <Link href={`/${route}`}>
            <SecondaryButton>
              <div> More {route}</div>
              <IconChevronRight className="w-4" />
            </SecondaryButton>
          </Link>
        </div>

        <ArticleList
          articles={routeSettings?.cols === 3 ? moreArticles : moreArticles.slice(0, 3)}
          routeSettings={routeSettings}
          route={route}
        />
      </div>
    </BlogLaylout>
  );
};

export async function getStaticPaths() {
  // const blogs = await prisma.blogWebsite.findMany({
  //   select: {
  //     customDomain: true,
  //     slug: true,
  //     notionBlogDatabaseId: true
  //   }
  // });

  // const fetchBlogs = await Promise.all(
  //   blogs.map(async blog => {
  //     const allPosts = await getAllPosts(blog?.notionBlogDatabaseId);
  //     let articles: any[] = [];

  //     console.log('blog & length:', blog?.slug, blog?.customDomain, allPosts.length);

  //     allPosts.forEach((article: any) => {
  //       if (article?.title && article?.route) {
  //         return articles.push({
  //           route: article?.route,
  //           slug: slugify(article?.title).toLowerCase()
  //         });
  //       }
  //     });

  //     return articles
  //       .filter(item => item?.route)
  //       .map(article => ({
  //         route: article.route,
  //         slug: article.slug,
  //         subdomain: blog.slug,
  //         customDomain: blog.customDomain
  //       }));
  //   })
  // );

  // const flattenBlogs = flattenDeep(fetchBlogs);

  // const paths = flattenBlogs.flatMap(blog => {
  //   if (blog?.subdomain === null || blog?.customDomain === null) return [];

  //   if (blog.customDomain) {
  //     return [
  //       {
  //         params: {
  //           site: blog.customDomain,
  //           route: blog.route,
  //           slug: blog.slug
  //         }
  //       },
  //       {
  //         params: {
  //           site: blog.subdomain,
  //           route: blog.route,
  //           slug: blog.slug
  //         }
  //       }
  //     ];
  //   } else {
  //     return {
  //       params: {
  //         site: blog.subdomain,
  //         route: blog.route,
  //         slug: blog.slug
  //       }
  //     };
  //   }
  // });

  return {
    paths: [],
    fallback: 'blocking'
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
    },
    revalidate: 1
  };
};

export default ArticlePage;
