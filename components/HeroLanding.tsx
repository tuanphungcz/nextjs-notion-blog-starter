import {
  IconBrandGithub,
  IconBrandGoogle,
  IconExternalLink,
  IconStar
} from '@tabler/icons';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function HeroLanding() {
  const { data: session } = useSession();
  const { push } = useRouter();

  return (
    <div className="flex-shrink-0 order-3 w-full mt-2 sm:order-2 sm:mt-0 sm:w-auto">
      <div className="sm:max-w-xl mt-20 mb-10 text-center mx-auto sm:px-0 px-2.5">
        <div className="flex items-center justify-center mx-auto">
          <a
            className="flex items-center px-4 py-2 text-base rounded-full gap-x-2 bg-black/5 hover:bg-black/10"
            href="https://github.com/tuanphungcz/blogfolio.co"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="p-1 text-xs text-white uppercase bg-black rounded-full">
              <IconBrandGithub className="w-4 h-4" />
            </span>{' '}
            Star on Github
          </a>
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
          <div
            className="flex items-center px-4 py-3 space-x-2 font-medium text-center text-white transition bg-gray-900 border border-gray-300 rounded-lg shadow-sm cursor-pointer hover:opacity-90"
            onClick={e => {
              e.preventDefault();
              !session?.user
                ? signIn('google', { callbackUrl: '/my-blogs' })
                : push('/my-blogs');
            }}
          >
            <div>
              {session?.user ? (
                'My blogs'
              ) : (
                <div className="flex items-center space-x-2">
                  <div className="p-1 bg-white rounded-xl">
                    <img src="/google.svg" className="w-4 h-4" />
                  </div>
                  <div>Get started</div>
                </div>
              )}
            </div>
          </div>

          <a href="https://tuan.blogfolio.co" target="_blank" rel="noopener noreferrer">
            <span className="relative inline-flex">
              <button
                type="button"
                className="inline-flex items-center px-4 py-3 space-x-2 font-medium text-center text-gray-700 transition bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer hover:bg-gray-50 hover:opacity-90"
              >
                <div>Demo blog</div>
                <IconExternalLink className="w-5" />
              </button>
              <span className="absolute top-0 right-0 flex w-3 h-3 -mt-1 -mr-1">
                <span className="absolute inline-flex w-full h-full bg-green-400 rounded-full opacity-75 animate-ping"></span>
                <span className="relative inline-flex w-3 h-3 bg-green-500 rounded-full"></span>
              </span>
            </span>
          </a>
        </div>
      </div>

      <div className="max-w-3xl mx-auto mt-16">
        <img src={'/preview/1.jpg'} className="rounded-xl" alt="hero" />
      </div>
    </div>
  );
}
