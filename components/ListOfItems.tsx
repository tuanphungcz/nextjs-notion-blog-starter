import { IconSearch } from '@tabler/icons';
import { Layout } from 'layouts/Layout';
import { filterArticles } from 'lib/filterArticles';
import { useState } from 'react';
import ArticleList from './base/ArticleList';
import Category from './Category';
import Container from './base/Container';
import HeroHeader from './HeroHeader';
import Link from 'next/link';

export default function ListOfItems({
  blog,
  routes,
  articles,
  route,
  categories,
  isHome
}: any) {
  const [selectedTag, setSelectedTag] = useState<string>(null);
  const [searchValue, setSearchValue] = useState('');
  const filteredArticles = filterArticles(articles, selectedTag, searchValue);

  const routeSettings = blog?.settingData?.links.find(setting =>
    setting?.url?.includes(route)
  );

  const site = blog?.settingData?.site;

  return (
    <Layout blog={blog} routes={routes}>
      {site?.headerTitle && isHome && <HeroHeader blog={blog} />}
      <Container>
        <div className="py-12">
          <div className="mb-4 space-y-6">
            <div className="mb-2 text-4xl font-bold text-gray-900 ">
              {!selectedTag
                ? `${
                    searchValue.length > 0 ? filteredArticles.length : 'Latest'
                  } ${route}`
                : `${selectedTag} ${route}`}
            </div>

            <>
              <div className="relative max-w-sm">
                <input
                  className="block w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg"
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
                {categories?.map(tag => (
                  <Category
                    tag={tag}
                    key={tag}
                    selectedTag={selectedTag}
                    setSearchValue={setSearchValue}
                    setSelectedTag={setSelectedTag}
                  />
                ))}
              </div>
            </>
          </div>

          <div className="mt-8">
            <ArticleList
              articles={isHome ? filteredArticles.slice(0, 6) : filteredArticles}
              route={route}
              routeSettings={routeSettings}
            />

            {isHome && (
              <div className="py-16">
                <div className="flex items-center justify-between">
                  <div />
                  <Link href={`/${route}`}>
                    <span className="text-lg font-semibold text-gray-900 cursor-pointer hover:underline">
                      Read more {route} ➜
                    </span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </Layout>
  );
}
