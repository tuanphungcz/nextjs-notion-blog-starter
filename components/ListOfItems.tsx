import { IconSearch } from '@tabler/icons';
import { Layout } from 'layouts/Layout';
import { filterArticles } from 'lib/filterArticles';
import { useState } from 'react';
import ArticleList from './base/ArticleList';
import Category from './Category';
import Container from './base/Container';
import HeroHeader from './HeroHeader';

export default function ListOfItems({
  blog,
  routes,
  articles,
  route,
  categories,
  hideHeader
}: any) {
  const [selectedTag, setSelectedTag] = useState<string>(null);
  const [searchValue, setSearchValue] = useState('');
  const filteredArticles = filterArticles(articles, selectedTag, searchValue);
  return (
    <Layout blog={blog} routes={routes}>
      {blog?.headerTitle && !hideHeader && <HeroHeader blog={blog} />}

      <Container>
        <div className="py-12">
          <div className="mb-10 space-y-6">
            <div className="mb-2 text-4xl font-bold text-gray-900 ">
              {!selectedTag
                ? `${
                    searchValue.length > 0 ? filteredArticles.length : 'Latest'
                  } ${route}`
                : `${selectedTag} ${route}`}
            </div>

            <div className="relative max-w-sm">
              <input
                className="block w-full px-4 py-2 text-gray-700 border border-gray-300 rounded"
                type="text"
                placeholder="Search articles"
                value={searchValue}
                onChange={(e: any) => {
                  const value = e.target.value;
                  setSelectedTag(null);
                  setSearchValue(value);
                }}
              />
              <IconSearch className="absolute w-5 text-gray-400 right-4 top-2" />
            </div>
            <div className="flex flex-wrap justify-start gap-4">
              {categories.map(tag => (
                <Category
                  tag={tag}
                  key={tag}
                  selectedTag={selectedTag}
                  setSearchValue={setSearchValue}
                  setSelectedTag={setSelectedTag}
                />
              ))}
            </div>
          </div>

          <ArticleList articles={filteredArticles} route={route} />
        </div>
      </Container>
    </Layout>
  );
}
