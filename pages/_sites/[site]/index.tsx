import { IconChevronRight } from '@tabler/icons';
import Link from 'next/link';
import { filterArticlesWithMetadata } from 'lib/notion';
import prisma, { blogSelect } from 'lib/prisma';
import { getAllPosts } from 'lib/posts';
import { getSiteOptions } from 'lib/utils';
import { SecondaryButton } from 'components/base/Button';
import {
  AboutMeBlock,
  RecommendationBlock,
  RepositoryBlock,
  WorkExperienceBlock
} from 'components/Blocks';
import ArticleCard from 'components/ArticleCard';
import BlogLaylout from 'layouts/BlogLayout';

const types = {
  ['ABOUT_ME']: AboutMeBlock,
  ['WORK_EXPERIENCE']: WorkExperienceBlock,
  ['RECOMMENDATIONS']: RecommendationBlock,
  ['REPOSITORIES']: RepositoryBlock
};

export default function Index({ articles, blog, route }: any) {
  if (!blog) {
    return (
      <div>
        The subdomain page probably does not exist, please contact admin{' '}
        <Link href="/">go back to main page</Link>
      </div>
    );
  }

  return (
    <BlogLaylout
      blog={blog}
      title="Tuan Phung - Frontend developer"
      description="Hi I'm Tuan a web developer"
      icon={blog.settingData?.site?.profileUrl}
      ogImage={null}
      baseUrl={null}
    >
      <div>
        {blog.settingData?.blocks.map(block => {
          const Component = types[block.type];
          return <Component key={block.type} blog={blog} block={block} />;
        })}

        <div>
          <div className="mt-24 mb-10 text-2xl font-bold tracking-tight text-zinc-800">
            Latest articles
          </div>
          <div className="mt-8">
            <div className={`grid gap-16 sm:grid-cols-2 auto-rows-max`}>
              {articles.slice(0, 4).map(article => (
                <ArticleCard
                  article={article}
                  key={article.id}
                  route={route}
                  routeSettings={blog.routeSettings}
                />
              ))}
            </div>

            <div className="pt-16 pb-8 text-center">
              <Link href={`/${route}`}>
                <SecondaryButton>
                  <div>More {route}</div>
                  <IconChevronRight className="w-4" />
                </SecondaryButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </BlogLaylout>
  );
}

export async function getStaticPaths() {
  // const blogs = await prisma.blogWebsite.findMany({
  //   select: {
  //     customDomain: true,
  //     slug: true
  //   }
  // });

  // const allPaths = [
  //   ...blogs.map(({ slug }) => slug),
  //   ...blogs.map(({ customDomain }) => customDomain)
  // ].filter(path => path);

  // return {
  //   paths: allPaths.map(path => ({
  //     params: {
  //       site: path
  //     }
  //   })),
  //   fallback: 'blocking'
  // };

  return {
    paths: [],
    fallback: 'blocking'
  };
}

export async function getStaticProps(context: any) {
  const { site } = context.params;

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

  const route = parsedSettingData?.links.find(item => item?.isDefault).name.toLowerCase();

  const allPosts = await getAllPosts(blog.notionBlogDatabaseId);

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
