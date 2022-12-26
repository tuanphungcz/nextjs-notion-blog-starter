![A preview of my revamped blogfolio](https://nextjs-notion-blog-starter.vercel.app/preview/1.jpg)

# Nextjs Notion Blog Starter
- [Default demo](https://nextjs-notion-blog-starter.vercel.app/) - Deployed from `main` branch
- [Blog setup](https://nextjs-notion-blog-starter.vercel.app/blog/deploy-your-notion-blog-powered-by-nextjs-and-tailwind) - I wrote an article on how to use this starter to start your blog


## ✨ Features
- ✅ Setup takes only a few minutes ([single file config](https://github.com/tuanphungcz/nextjs-notion-blog-starter/blob/main/data/siteData.ts)) 💪
- ✅ Newsletter subscription via [Convertkit API](https://github.com/tuanphungcz/nextjs-notion-blog-starter/blob/main/pages/api/subscribe-convertkit.tsx) 
- ✅ Simple analytics with [Umami](https://github.com/umami-software/umami)

- ✅ Automatic OG social images with [Tailwind template](https://github.com/tuanphungcz/nextjs-notion-blog-starter/blob/main/components/OgTemplate.tsx)
- ✅ Automatic pretty URLs
- ✅ Excellent page speed
- ✅ Optimized for Next.js and Vercel
## 🛠 Build with

- **Framework**: [Next.js](https://nextjs.org/), [Typescript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Content**: [Notion API](https://developers.notion.com)
- **Newsletter**: [Convertkit](https://convertkit.com/)
- **Deployment**: [Vercel](https://vercel.com)

## 📕 Project Overview

- `layouts/*` - The different layouts used on each page.
- `components/*` - Components used throughout the site.
- `components/notionBlocks/*` - Custom blocks made for Notion rendering.
- `utils/*` - Short for "utilities", a collection of helpful utilities or code for external services.
- `pages/api/*` - [API routes](https://nextjs.org/docs/api-routes/introduction) powering [`/og-image`](https://github.com/neg4n/next-api-og-image) dynamic OG image and [`/subscribe-convertkit`](https://github.com/tuanphungcz/nextjs-notion-blog-starter/blob/main/pages/api/subscribe-convertkit.tsx) newsletter subscription.
- `pages/blog/*` - Static pre-rendered blog pages that fetch information from the Notion API.
- `pages/*` - All other static pages.
- `public/*` - Static assets including images, fonts, and videos.
- `styles/*` - global styles and Tailwind.
- `data/*` - a simple file containing global data about the site.

## 🏃‍♂️ Running Locally

```bash
git clone https://github.com/tuanphungcz/nextjs-notion-blog-starter
cd nextjs-notion-blog-starter
npm install
npm run dev
```


Create a `.env` file similar to `.env.example` and include the appropriate keys.


## 🚀 Deploy to vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ftuanphungcz%2Fnextjs-notion-blog-starter&env=NOTION_SECRET,DATABASE_ID&envDescription=Notion%20secret%20API%20key%20&envLink=https%3A%2F%2Fnextjs-notion-blog-starter.vercel.app%2Fblog%2Fdeploy-your-notion-blog-powered-by-nextjs-and-tailwind&project-name=my-notion-blog&repo-name=my-notion-blog)

```
NOTION_SECRET=
BLOG_DATABASE_ID=

# ConvertKit is optional
NEXT_PUBLIC_CONVERTKIT_FORM_ID=
NEXT_PUBLIC_CONVERTKIT_API_KEY=

# Umami is optional
NEXT_PUBLIC_UMAMI_ID=
NEXT_PUBLIC_UMAMI_URL=
```



## 💁‍♀️ How to use
- [Blog setup](https://nextjs-notion-blog-starter.vercel.app/blog/deploy-your-notion-blog-powered-by-nextjs-and-tailwind) - I wrote an article on how to use this starter to start your blog



## 📝 Credit & inspiration 
This blog starter was inspired by all of these awesome open-sources

- [samuelkraft-next](https://github.com/samuelkraft/samuelkraft-next) by [@samuelkraft](https://github.com/samuelkraft)
- [leerob.io](https://github.com/leerob/leerob.io) by [@leerob](https://github.com/leerob)
- [Next.js Notion Starter Kit](https://github.com/transitive-bullshit/nextjs-notion-starter-kit) by [@transitive-bullshit](https://github.com/transitive-bullshit)
- [braydoncoyer.dev](https://github.com/braydoncoyer/braydoncoyer.dev) by [@braydoncoyer](https://github.com/braydoncoyer/braydoncoyer)

