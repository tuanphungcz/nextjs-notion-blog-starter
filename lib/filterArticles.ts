const arraySearch = (array, keyword) => {
  const searchTerm = keyword.toLowerCase();
  const result = array.filter(item => {
    return item.fullText.toLowerCase().match(new RegExp(searchTerm, 'g'));
  });

  return result
};

const filterByTag = (articles, selectedTag) =>  {
  return articles
    .sort((a, b) => Number(new Date(b.published)))
    .filter(article => {
      if (selectedTag === null) {
        return true;
      }
      return article.categories.includes(selectedTag);
    });
}


export function filterArticles(articles, selectedTag, searchValue) {
  if(searchValue.length > 0) {
    return arraySearch(articles, searchValue)
  }

  return filterByTag(articles, selectedTag)

}
