import { IconChevronRight, IconSearch } from '@tabler/icons';
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
          <div className="mb-4 space-y-4">
            <div className="text-4xl font-bold text-gray-900 ">
              {!selectedTag ? (
                `${searchValue.length > 0 ? filteredArticles.length : 'Latest'} ${route}`
              ) : (
                <span>
                  <span className="capitalize">{selectedTag}</span> {' '}
                  {route}
                </span>
              )}
            </div>
            {routeSettings?.description && (
              <div className="text-xl text-gray-500">{routeSettings?.description}</div>
            )}

            <>
              {routeSettings?.isSearchVisible && (
                <div className="relative max-w-sm">
                  <input
                    className="block w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg"
                    type="text"
                    placeholder={`Search ${route}`}
                    value={searchValue}
                    onChange={(e: any) => {
                      const value = e.target.value;
                      setSelectedTag(null);
                      setSearchValue(value);
                    }}
                  />
                  <IconSearch className="absolute w-5 text-gray-400 right-4 top-2" />
                </div>
              )}
              {routeSettings?.isTagsVisible && (
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
              )}
            </>
          </div>

          <div className="mt-8">
            <ArticleList
              articles={isHome ? filteredArticles.slice(0, 6) : filteredArticles}
              route={route}
              routeSettings={routeSettings}
            />

            {isHome && (
              <div className="pt-8">
                <Link href={`/${route}`}>
                  <span className="relative flex justify-center">
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 space-x-2 text-sm font-medium text-center text-gray-700 transition bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer hover:bg-gray-50 hover:opacity-90"
                    >
                      <div>More {route}</div>
                      <IconChevronRight className="w-4" />
                    </button>
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </Container>
    </Layout>
  );
}
