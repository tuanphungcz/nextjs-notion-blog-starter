export function filterArticles(articles, selectedTag) {
  return articles
    .sort((a, b) => Number(new Date(b.publishedDate)))
    .filter(article => {
      if (selectedTag === null) {
        return true;
      }
      return article.categories.includes(selectedTag);
    });
}
