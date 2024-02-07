import { convertToArticleList, getAllArticles, notion } from 'utils/notion';
import { Layout } from 'layouts/Layout';
import HeroHeader from 'components/HeroHeader';
import Container from 'components/Container';
import { Fragment, useState } from 'react';
import { filterArticles } from 'utils/filterArticles';
import Category from 'components/Category';
import ArticleCard from 'components/ArticleCard';

export default function Index(props) {
  const { articles, categories } = props;

  const [selectedTag, setSelectedTag] = useState<string>(null);
  const filteredArticles = filterArticles(articles, selectedTag);

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
          <div className="grid gap-10 lg:gap-12 sm:grid-cols-2">
            {filteredArticles.map(article => (
              <ArticleCard article={article} key={article.id} />
            ))}
          </div>
        </div>
      </Container>
    </Layout>
  );
}

const fetchPageBlocks = (pageId: string) => {
  return notion.blocks.children.list({ block_id: pageId }).then(res => res.results);
};

export const getStaticProps = async () => {
  const data = await getAllArticles(process.env.BLOG_DATABASE_ID);

  const blocks = await fetchPageBlocks(data[0].id);

  const { articles, categories } = convertToArticleList(data);

  return {
    props: {
      data,
      blocks,
      articles,
      categories
    },
    revalidate: 60 * 60
  };
};
