import Link from 'next/link';
import { filterArticlesWithMetadata } from 'lib/notion';
import prisma, { blogSelect } from 'lib/prisma';
import ListOfItems from 'components/ListOfItems';
import { getAllPosts } from 'lib/posts';
import { flattenDeep, getSiteOptions } from 'lib/utils';
import { useRouter } from 'next/router';

export default function Index({ articles, categories, blog, routes, route }: any) {
  const router = useRouter();
  if (router.isFallback) {
    return <div />;
  }

  if (!blog) {
    return (
      <div>
        The subdomain page probably does not exist, please contact admin{' '}
        <Link href="/">go back to main page</Link>
      </div>
    );
  }

  const listProps = { blog, routes, route, categories, articles, isHome: false };

  return <ListOfItems {...listProps} />;
}

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

      let routes: string[] = [];

      allPosts.forEach((article: any) => {
        if (!routes.includes(article?.route)) {
          routes.push(article?.route);
        }
      });

      return routes
        .filter(item => item)
        .map(route => ({
          route,
          slug: blog.slug,
          customDomain: blog.customDomain
        }));
    })
  );

  const flattenBlogs = flattenDeep(x);

  const paths = flattenBlogs.flatMap(blog => {
    if (blog?.slug === null || blog?.customDomain === null) return [];

    if (blog.customDomain) {
      return [
        {
          params: {
            site: blog.customDomain,
            route: blog.route
          }
        },
        {
          params: {
            site: blog.slug,
            route: blog.route
          }
        }
      ];
    } else {
      return {
        params: {
          site: blog.slug,
          route: blog.route
        }
      };
    }
  });

  return {
    paths: paths,
    fallback: 'blocking'
  };
}

export async function getStaticProps(context: any) {
  const { site, route } = context.params;

  if (!site) {
    return {
      props: {
        profile: null
      }
    };
  }

  const blog = await prisma.blogWebsite.findFirst({
    where: getSiteOptions(site),
    select: blogSelect
  });

  if (!blog?.slug) {
    return {
      props: {
        profile: null
      }
    };
  }

  const parsedSettingData = JSON.parse(blog?.settingData);
  const allPosts = await getAllPosts(blog?.notionBlogDatabaseId);
  const { categories, routes, articles } = filterArticlesWithMetadata(allPosts, route);

  return {
    props: {
      blog: {
        ...blog,
        settingData: parsedSettingData
      },
      articles,
      categories,
      routes,
      route
    },
    revalidate: 60
  };
}
