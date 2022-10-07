import Link from 'next/link';
import { convertToArticleList, getAllArticles } from 'lib/notion';
import prisma, { blogSelect } from 'lib/prisma';
import ListOfItems from 'components/ListOfItems';

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

    const route = JSON.parse(blog?.settingData)
      .links.find(item => item.isDefault === true)
      .name.toLowerCase();

    const data = await getAllArticles(
      blog.notionBlogDatabaseId,
      blog.notionSecret,
      route
    );

    const { articles, categories, routes } = convertToArticleList(data);

    return {
      props: {
        blog,
        articles,
        categories,
        routes,
        route
      }
    };
  } catch (error) {
    console.log(error);
    return;
  }
}
