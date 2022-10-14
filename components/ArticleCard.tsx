import slugify from 'slugify';
import getLocalizedDate from 'lib/getLocalizedDate';
import Link from 'next/link';
import TagItem from './base/TagItem';

export default function ArticleCard({ article, route }: any) {
  const slug = slugify(article.title).toLowerCase();

  const formattedTime = getLocalizedDate(article.published);

  const withHttp = url => (!/^https?:\/\//i.test(url) ? `http://${url}` : url);

  return (
    <Link
      href={article?.externalLink ? withHttp(article.externalLink) : `/${route}/${slug}`}
    >
      <div
        className={`flex flex-col overflow-hidden cursor-pointer group ${
          !article?.coverImage && '-m-4 p-4 rounded-lg hover:bg-gray-100 transition'
        }`}
      >
        {article?.coverImage && (
          <div className=" filter contrast-[0.9] mb-4">
            <img
              className="object-cover w-full border transition rounded-lg aspect-[16/9] group-hover:opacity-90 "
              src={article.coverImage}
              alt="article cover"
            />
          </div>
        )}
        <div className="flex flex-col justify-between space-y-2">
          <div className="flex space-x-2 text-sm text-gray-400">
            {article.categories?.slice(0, 2).map((category, i) => (
              <TagItem key={category + i} isSelected={false}>
                {category}
              </TagItem>
            ))}
          </div>
          <div className="px-2 space-y-2">
            <p className="font-semibold text-gray-900">{article.title}</p>
            <p className="z-10 mt-3 text-sm text-zinc-600 line-clamp-2">
              {article.summary}
            </p>

            <time className="text-xs text-gray-400" dateTime={formattedTime}>
              {formattedTime}
            </time>

            <div className="relative z-10 flex items-center pt-4 text-xs font-medium text-gray-700">
              Read more ➜
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

{
  /* <h2 className="font-semibold text-zinc-800">
<div className="absolute z-0 transition scale-95 opacity-0 -inset-y-6 -inset-x-4 bg-zinc-50 sm:-inset-x-6 sm:rounded-2xl"></div>
<Link href={item.url}>
  <span className="relative z-10 text-sm">{item.name}</span>
</Link>
</h2>
<p className="relative z-10 mt-2 text-sm text-zinc-600 ">
{item.description}
</p>
{item?.url && (
<div className="relative z-10 flex items-center mt-4 text-xs font-medium text-blue-500">
  Read more on dev.to
</div>
)} */
}
