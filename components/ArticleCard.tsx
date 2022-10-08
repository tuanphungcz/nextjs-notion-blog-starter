/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import slugify from 'slugify';
import getLocalizedDate from 'lib/getLocalizedDate';

export default function ArticleCard({ article, route }: any) {
  if (!article.title) return null;
  const slug = slugify(article.title).toLowerCase();

  const formattedTime = getLocalizedDate(article.publishedDate);

  const hasCoverImage = article?.coverImage === '/image-background.png';

  return (
    <a href={`/${route}/${slug}`}>
      <div
        className={`flex flex-col overflow-hidden cursor-pointer group ${
          hasCoverImage && 'border p-4 rounded-md hover:bg-gray-100 transition'
        }`}
      >
        {!hasCoverImage && (
          <div className="relative">
            {/* <div className="absolute">
              {article?.categories?.map(category => (
                <div
                  key={category}
                  className="relative shadow z-[2] inline-flex items-center px-3 py-1.5 mb-2 mr-2 text-xs font-bold text-gray-600 uppercase bg-gray-100 rounded left-3 top-3"
                >
                  {category}
                </div>
              ))}
            </div> */}
            <div className=" filter contrast-[0.9]">
              <img
                className="object-cover w-full transition rounded-lg aspect-video group-hover:opacity-90 "
                src={article.coverImage}
                // blurDataURL={article.coverImage}
                // objectFit="cover"
                // placeholder="blur"
                // layout="intrinsic"
                // width={800}
                // height={400}
                alt={'article cover'}
              />
            </div>
          </div>
        )}
        <div className="flex flex-col justify-between flex-1 py-4 ">
          <div className="flex-1">
            <p className="text-lg font-semibold text-gray-900">{article.title}</p>
            <p className="mt-3 text-base text-gray-500 line-clamp-2">{article.summary}</p>
          </div>
          <div className="flex items-center mt-4">
            <div className="flex mb-2 space-x-1 text-sm text-gray-400">
              {article.categories.map(category => (
                <div key={category}>
                  <span className="font-semibold text-gray-600">{category} </span>
                </div>
              ))}
              <time dateTime={formattedTime}>{formattedTime}</time>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
