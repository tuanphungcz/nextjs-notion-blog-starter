import Link from 'next/link';
import { convertToArticleList } from 'lib/notion';
import prisma, { blogSelect } from 'lib/prisma';
import ListOfItems from 'components/ListOfItems';
import { getAllPosts } from 'lib/posts';

export default function Index({ articles, categories, blog, routes, route }: any) {
  if (!blog) {
    return (
      <div>
        The subdomain page probably does not exist, please contact admin{' '}
        <Link href="/">go back to main page</Link>
      </div>
    );
  }

  const listProps = { blog, routes, route, categories, articles };

  return <ListOfItems {...listProps} />;
}

export async function getServerSideProps(context: any) {
  try {
    const { site } = context.query;

    if (!site) {
      return {
        props: {
          profile: null
        }
      };
    }

    const findOptions = site.includes('.') ? { customDomain: site } : { slug: site };

    const blog = await prisma.blogWebsite.findFirst({
      where: findOptions,
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

    const route = parsedSettingData?.links
      .find(item => item?.isDefault)
      .name.toLowerCase();

    const allPosts = await getAllPosts(blog.notionBlogDatabaseId);

    const { articles, categories, routes } = convertToArticleList(allPosts, route);

    return {
      props: {
        blog: {
          ...blog,
          settingData: parsedSettingData
        },
        articles,
        route,
        categories,
        routes
      }
    };
  } catch (error) {
    console.log(error);
    return;
  }
}
