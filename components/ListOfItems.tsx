import { IconChevronRight, IconSearch } from '@tabler/icons';
import { filterArticles } from 'lib/filterArticles';
import { useState } from 'react';
import ArticleList from './base/ArticleList';
import Link from 'next/link';
import { SecondaryButton } from './base/Button';
import TagItem from './base/TagItem';

export default function ListOfItems({ blog, articles, route, categories, isHome }: any) {
  const [selectedTag, setSelectedTag] = useState<string>(null);
  const [searchValue, setSearchValue] = useState('');
  const filteredArticles = filterArticles(articles, selectedTag, searchValue);

  const routeSettings = blog?.settingData?.links.find(setting =>
    setting?.url?.includes(route)
  );

  const onCategoryClick = (category: string) => {
    setSearchValue('');

    return selectedTag === category ? setSelectedTag(null) : setSelectedTag(category);
  };

  return (
    <>
      <div className="">
        <div className="mb-4 space-y-4">
          <div className="text-4xl font-bold text-gray-900 ">
            {!selectedTag ? (
              `${searchValue.length > 0 ? filteredArticles.length : 'Latest'} ${route}`
            ) : (
              <span>
                <span className="capitalize">{selectedTag}</span> {route}
              </span>
            )}
          </div>
          {routeSettings?.description && (
            <div className="mt-6 text-base text-zinc-600 ">
              {routeSettings?.description}
            </div>
          )}

          <>
            {routeSettings?.isSearchVisible && (
              <div className="relative max-w-xs">
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
                  <TagItem
                    tag={tag}
                    key={tag}
                    isSelected={selectedTag === tag}
                    onClick={() => onCategoryClick(tag)}
                  >
                    {tag || 'All'}
                  </TagItem>
                ))}
              </div>
            )}
          </>
        </div>

        <div className="mt-8">
          <ArticleList
            articles={isHome ? filteredArticles.slice(0, 3) : filteredArticles}
            route={route}
            routeSettings={routeSettings}
          />

          {isHome && (
            <div className="pt-8 text-center">
              <Link href={`/${route}`}>
                <SecondaryButton>
                  <div>More {route}</div>
                  <IconChevronRight className="w-4" />
                </SecondaryButton>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
