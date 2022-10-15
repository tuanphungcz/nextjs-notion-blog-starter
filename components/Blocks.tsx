import { IconChevronRight, IconGitFork, IconStar } from '@tabler/icons';
import DOMPurify from 'isomorphic-dompurify';

import Link from 'next/link';
import Socials from './Socials';

export const AboutMeBlock = ({ block, blog }) => {
  return (
    <div className="">
      <div className="max-w-xl">
        <div className="text-3xl font-bold tracking-tight sm:text-4xl text-zinc-800 ">
          {block.title}
        </div>
        <div className="mt-6 text-base text-zinc-600 ">
          <div
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(block.description) }}
          ></div>
        </div>
      </div>
      <div className="flex gap-6 mt-6">
        <Socials socialIcons={blog.settingData?.site?.socials} />
      </div>
    </div>
  );
};

export const WorkExperienceBlock = ({ block }) => {
  return (
    <div>
      <div className="mt-24 mb-10 text-2xl font-bold tracking-tight text-zinc-800">
        {block.title}
      </div>
      <div className="grid max-w-xl gap-12">
        {block.jobs.map(item => {
          return (
            <div key={item?.title} className="relative group">
              <div className="flex items-start space-x-4">
                <img
                  src={item.imageUrl}
                  className="relative z-50 w-10 h-10 mt-1 border rounded-full"
                />
                <div>
                  <h2 className="text-base font-semibold text-zinc-800">
                    <span className="relative z-10 text">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(item.title)
                        }}
                      />
                    </span>
                  </h2>
                  <div className="relative z-10 text-sm text-zinc-500 ">
                    {item.description}
                  </div>
                  <div className="relative z-10 mt-2 space-y-2 text-sm text-zinc-600 ">
                    {DOMPurify.sanitize(item.longDescription).split('\n').map((i, key) => {
                      return (
                        <div
                          key={key}
                          dangerouslySetInnerHTML={{ __html: i }}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const RecommendationBlock = ({ block }) => {
  return (
    <div>
      <div className="mt-24 mb-10 text-2xl font-bold tracking-tight text-zinc-800">
        {block.title}
      </div>

      <div className="grid gap-12 sm:grid-cols-2">
        {block.items.map(item => {
          return (
            <li
              key={item.title}
              className="relative flex flex-col items-start cursor-pointer group"
              onClick={() => {
                if (item.url) {
                  window.open(item.url, '_blank');
                }
              }}
            >
              {item?.url && (
                <div className="absolute z-0 transition scale-95 opacity-0 -inset-y-6 -inset-x-4 bg-zinc-50 group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl"></div>
              )}{' '}
              <div className="relative z-50 flex space-x-4">
                <img
                  src={item.imageUrl}
                  className="relative z-50 w-10 h-10 border rounded-full"
                />

                <div>
                  <div className="relative text-sm font-semibold text-zinc-800">
                    {item.name}
                  </div>
                  <div className="relative z-10 text-sm text-zinc-500 ">{item.title}</div>
                </div>
              </div>
              <p className="relative z-10 mt-2 text-sm whitespace-pre-line text-zinc-600 line-clamp-3 ">
                {item.description}
              </p>
              {item?.url && (
                <div className="relative z-10 flex items-center mt-4 space-x-2 text-xs font-medium text-gray-600">
                  <div>Read more</div> <IconChevronRight className="w-4" />
                </div>
              )}
            </li>
          );
        })}
      </div>
    </div>
  );
};

export const RepositoryBlock = ({ block }) => {
  return (
    <div>
      <div className="mt-24 mb-10 text-2xl font-bold tracking-tight text-zinc-800">
        {block.title}
      </div>

      <div className="grid gap-12 sm:grid-cols-2">
        {block.items.map((item, i) => {
          return (
            <li
              key={item.url + i}
              className="relative flex flex-col items-start cursor-pointer group"
              onClick={() => {
                if (item.url) {
                  window.open(item.url, '_blank');
                }
              }}
            >
              {item?.url && (
                <div className="absolute z-0 transition scale-95 opacity-0 -inset-y-6 -inset-x-4 bg-zinc-50 group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl"></div>
              )}
              <h2 className="font-semibold text-zinc-800">
                <Link href={item.url}>
                  <span className="relative z-10 text-sm">{item.name}</span>
                </Link>
              </h2>
              <p className="relative z-10 mt-2 text-sm text-zinc-600 ">
                {item.description}
              </p>
              <div className="z-50 flex mt-2 space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <IconStar className="w-4 text-gray-600" />
                  <div className="text-xs">{item.stars}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <IconGitFork className="w-4 text-gray-600" />
                  <div className="text-xs">{item.forks}</div>
                </div>
              </div>
            </li>
          );
        })}
      </div>
    </div>
  );
};
