import { convertToArticleList, getAllArticles } from 'utils/notion';
import { Layout } from 'layouts/Layout';
import HeroHeader from 'components/HeroHeader';
import Container from 'components/Container';
import { useState } from 'react';
import ArticleList from 'components/ArticleList';
import { filterArticles } from 'utils/filterArticles';
import Category from 'components/Category';
import useTheme from 'hooks/useTheme';

export default function Index({ articles, categories }) {
  const [selectedTag, setSelectedTag] = useState<string>(null);
  const filteredArticles = filterArticles(articles, selectedTag);
  const { theme, toggleTheme } = useTheme();

  return (
    <Layout>
      <HeroHeader />
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        {categories.map(tag => (
          <Category
            tag={tag}
            key={tag}
            selectedTag={selectedTag}
            setSelectedTag={setSelectedTag}
          />
        ))}
      </div>
      <Container>
        <div className="py-8">
          <div className="my-8 text-3xl font-bold text-gray-900">
            {!selectedTag ? 'Latest articles' : `${selectedTag} articles`}
          </div>
          <ArticleList articles={filteredArticles} />
        </div>
      </Container>
      <button
        type="button"
        onClick={toggleTheme}
        className="fixed bottom-0 right-0 text-sm bg-slate-900 text-white rounded-md m-4 px-5 py-2 dark:bg-slate-100 dark:text-slate-800 sm:text-l md:text-xl z-20"
      >
        {theme === 'light' ? 'Dark' : 'Light'}
      </button>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const data = await getAllArticles(process.env.BLOG_DATABASE_ID);

  const { articles, categories } = convertToArticleList(data);

  return {
    props: {
      articles,
      categories
    },
    revalidate: 30
  };
};
