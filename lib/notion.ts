import { Client } from '@notionhq/client';
import slugify from 'slugify';

export const getAllArticles = async (databaseId, notionSecret, route) => {
  const notion = new Client({
    auth: notionSecret
  });

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: 'Status',
          select: {
            equals: '✅ Published'
          }
        },
        {
          property: 'Route',
          select: {
            equals: route
          }
        }
      ]
    },
    sorts: [
      {
        property: 'Published',
        direction: 'descending'
      }
    ]
  });

  return response.results;
};

const mapArticleProperties = article => {
  const { id, properties } = article;

  const summary = properties?.Summary.rich_text[0]?.plain_text ?? '';
  const title = properties?.Name.title[0].plain_text || '';
  const categories =
    properties?.Categories?.multi_select.map((category: any) => category.name) || [];

  const route = properties?.Route?.select?.name || '';

  return {
    id: id,
    title,
    categories,
    author: {
      name: properties.Author.created_by.name,
      imageUrl: properties.Author.created_by.avatar_url
    },
    coverImage:
      properties?.CoverImage?.files[0]?.file?.url ||
      properties?.CoverImage?.files[0]?.external?.url ||
      '/image-background.png',
    publishedDate: properties.Published?.date?.start,
    lastEditedAt: properties.LastEdited?.last_edited_time,
    route,
    summary,
    fullText: [summary, title, categories]
      .map(item => (Array.isArray(item) ? item.join(' ') : item))
      .join(' ')
      .toLowerCase()
  };
};

export const convertToArticleList = (tableData: any) => {
  let categories: string[] = [];
  let routes: string[] = [];

  const articles = tableData.map((article: any) => {
    const { properties } = article;

    properties?.Categories?.multi_select?.forEach((category: any) => {
      const { name } = category;
      if (!categories.includes(name) && name) {
        categories.push(name);
      }
    });

    const route = properties?.Route?.select?.name || '';

    if (!routes.includes(route) && route) {
      routes.push(route);
    }

    return mapArticleProperties(article);
  });

  return { articles, categories, routes };
};

export const getMoreArticlesToSuggest = async (
  databaseId,
  currentArticleTitle,
  notion,
  route
) => {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: 'Status',
          select: {
            equals: '✅ Published'
          }
        },
        {
          property: 'Route',
          select: {
            equals: route
          }
        },
        {
          property: 'Name',
          text: {
            does_not_equal: currentArticleTitle
          }
        }
      ]
    }
  });

  const moreArticles = response.results.map((article: any) =>
    mapArticleProperties(article)
  );

  return shuffleArray(moreArticles).slice(0, 3);
};

export const getArticlePage = (data, slug) => {
  const response = data.find(result => {
    if (result.object === 'page') {
      const resultSlug = slugify(
        result.properties.Name.title[0].plain_text
      ).toLowerCase();
      return resultSlug === slug;
    }
    return false;
  });

  return response;
};

export function shuffleArray(array: Array<any>) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex != 0) {
    // Pick a random element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

export const getArticlePageData = async (
  page: any,
  slug: any,
  databaseId,
  notionSecret,
  route
) => {
  const notion = new Client({
    auth: notionSecret
  });

  let content = [];
  let title = '';

  title = page.properties.Name.title[0].plain_text;

  const moreArticles: any = await getMoreArticlesToSuggest(
    databaseId,
    title,
    notion,
    route
  );

  let blocks = await notion.blocks.children.list({
    block_id: page.id
  });

  content = [...blocks.results];

  while (blocks.has_more) {
    blocks = await notion.blocks.children.list({
      block_id: page.id,
      start_cursor: blocks.next_cursor
    });

    content = [...content, ...blocks.results];
  }

  return {
    ...mapArticleProperties(page),
    content,
    slug,
    moreArticles
  };
};
