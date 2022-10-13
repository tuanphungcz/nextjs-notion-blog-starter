import { IconBrandGithub, IconExternalLink } from '@tabler/icons';
import { SecondaryButton, SignInButton } from './base/Button';
import NewTabLink from './base/NewTabLink';

export default function HeroLanding() {
  return (
    <div className="flex-shrink-0 order-3 w-full mt-2 sm:order-2 sm:mt-0 sm:w-auto">
      <div className="sm:max-w-xl mt-20 mb-10 text-center mx-auto sm:px-0 px-2.5">
        <div className="flex items-center justify-center mx-auto">
          <NewTabLink
            className="flex items-center px-4 py-2 text-base rounded-full gap-x-2 bg-black/5 hover:bg-black/10"
            href="https://github.com/tuanphungcz/blogfolio.co"
          >
            <span className="p-1 text-xs text-white uppercase bg-black rounded-full">
              <IconBrandGithub className="w-4 h-4" />
            </span>{' '}
            Star on Github
          </NewTabLink>
        </div>

        <h1 className="mt-5 text-5xl font-extrabold leading-tight text-black sm:text-6xl sm:leading-tight font-display">
          Open Source
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500">
            Notion blog starter
          </span>
        </h1>
        <p className="mt-5 text-2xl text-gray-600">
          Blogfolio is a free and open source blog starter built with Next.js and Notion.
        </p>
        <div className="flex mx-auto mt-10 space-x-4 max-w-fit">
          <SignInButton />
          <NewTabLink
            href={
              process.env.NEXT_PUBLIC_IS_LOCALHOST
                ? 'http://tuan.localhost:3000'
                : 'https://tuan.blogfolio.co'
            }
          >
            <SecondaryButton>
              <div className="flex items-center space-x-2">
                <div>Demo blog</div>
                <IconExternalLink className="w-5" />
              </div>
              <div className="absolute top-0 flex w-3 h-3 -mt-1 -mr-1 -right-1">
                <span className="absolute inline-flex w-full h-full bg-green-400 rounded-full opacity-75 animate-ping"></span>
                <span className="relative inline-flex w-3 h-3 bg-green-500 rounded-full"></span>
              </div>
            </SecondaryButton>
          </NewTabLink>
        </div>
      </div>

      <div className="max-w-3xl mx-auto mt-16">
        <img src={'/preview/1.jpg'} className="rounded-xl" alt="hero" />
      </div>
    </div>
  );
}
