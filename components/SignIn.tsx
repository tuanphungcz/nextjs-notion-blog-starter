import { IconStar } from '@tabler/icons';
import { signIn } from 'next-auth/react';

export default function SignIn() {
  return (
    <div className="flex-shrink-0 order-3 w-full mt-2 sm:order-2 sm:mt-0 sm:w-auto">
      <div className="sm:max-w-xl mt-20 mb-10 text-center mx-auto sm:px-0 px-2.5">
        <h1 className="mt-5 text-5xl font-extrabold leading-tight text-black sm:text-6xl sm:leading-tight font-display">
          Open Source
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500">
            Notion blog starter
          </span>
        </h1>
        <p className="mt-5 text-xl text-gray-600 sm:text-2xl">
          Blogg is a free and open source blog starter built with Next.js and Notion.
        </p>
        <div className="flex mx-auto mt-10 space-x-4 max-w-fit">
          <div
            className="flex items-center px-3 py-2 space-x-2 text-sm font-semibold text-center text-white transition bg-gray-900 border border-gray-300 rounded shadow-sm cursor-pointer hover:opacity-90"
            onClick={e => {
              e.preventDefault();
              signIn('google', { callbackUrl: '/' });
            }}
          >
            Get started
          </div>
          <a
            className="flex items-center px-3 py-2 space-x-2 text-sm font-semibold text-center text-gray-700 transition bg-white border border-gray-300 rounded shadow-sm cursor-pointer hover:opacity-90"
            href="https://github.com/tuanphungcz/nextjs-notion-blog-starter"
            target="_blank"
            rel="noreferrer"
          >
            <IconStar className='w-4' />
            <p className="text-sm">Star on GitHub</p>
          </a>
        </div>
      </div>

      <div className="max-w-3xl mx-auto mt-16">
        <img src={'/preview/1.jpg'} className="rounded-xl" alt="hero" />
      </div>
    </div>
  );
}
