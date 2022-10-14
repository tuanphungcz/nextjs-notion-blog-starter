import slugify from 'slugify';

const mapArticleProperties = article => {
  const summary = article?.summary ?? '';
  const title = article?.title || '';
  const categories = article?.categories || [];
  const route = article?.route || '';

  return {
    id: article?.id,
    title,
    categories,
    summary,
    route,
    externalLink: article?.externalLink || null,
    coverImage: article?.coverImage?.length > 0 && article?.coverImage[0].url,
    published: article?.published,
    lastEdited: article?.published,
    fullText: [summary, title, categories]
      .map(item => (Array.isArray(item) ? item.join(' ') : item))
      .join(' ')
      .toLowerCase()
  };
};

export const filterArticlesWithMetadata = (rawArticles: any, route) => {
  let categories: string[] = [];
  let routes: string[] = [];

  const filteredArticles = rawArticles.filter(article => article.route === route);

  const articles = filteredArticles.map((article: any) => {
    article?.categories?.forEach((category: any) => {
      if (!categories.includes(category)) {
        categories.push(category);
      }
    });

    if (!routes.includes(article?.route)) {
      routes.push(article?.route);
    }

    return mapArticleProperties(article);
  });

  return { categories, routes, articles };
};

export const getArticlePage = (data, slug) => {
  const response = data.find(result => {
    if (result?.title) {
      const resultSlug = slugify(result?.title).toLowerCase();
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
