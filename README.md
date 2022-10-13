> **October 2022:** I am releasing a new verssion which allows user to create multiple blog posts. The previous version [Nextjs Notion Blog Starter](https://github.com/tuanphungcz/blogfolio.co/tree/blog-starter) is still available under the [blog-starter](https://github.com/tuanphungcz/blogfolio.co) branch.

---

<a href="https://blogfolio.co">
  <img alt="Dub – an open-source link shortener SaaS with built-in analytics + free custom domains." src="https://blogfolio.co/preview/v1.jpg">
  <h1 align="center">Blogfolio.co</h1>
</a>

<p align="center">
  An open-source link notion-powered blog starter with Nextjs and Tailwind + free custom domains.
</p>

<br/>

# Introduction

Blogfolio is a open-source blog starter built with Nextjs and Tailwind. It uses Notion as a CMS and is deployed on Vercel. Build on top of [Notion API worker](https://github.com/splitbee/notion-api-worker) and [React-notion](https://github.com/splitbee/react-notion)

<br/>

## ✨ Live Demo

- [Homepage](https://blogfolio.co/) - Deployed from `main` branch
- [My personal site](https://phung.io) - Built from blogfolio with a subdomain: [tuan.blogfolio.co](https://tuan.blogfolio.co))
- [Will be added]() - I wrote an article on how to use this starter to start your blog

## ✨ Features

- ✅ Excellent page speed
- ✅ Optimized for Next.js and Vercel
- ✅ Automatic OG social images with [@vercel/og](https://github.com/vercel/og-image)
- ✅ Automatic pretty URLs
- ✅ Newsletter subscription via [Convertkit API](https://github.com/tuanphungcz/nextjs-notion-blog-starter/blob/main/pages/api/subscribe-convertkit.tsx)
- ✅ Simple analytics with [Umami](https://github.com/umami-software/umami)

## 🛠 Tech stack

- **Framework**: [Next.js](https://nextjs.org/), [Typescript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Content**: [Notion API worker](https://github.com/splitbee/notion-api-worker)
- **Notion rendering**: [React-notion](https://github.com/splitbee/react-notion)
- **Newsletter**: [Convertkit](https://convertkit.com/)
- **Deployment**: [Vercel](https://vercel.com)

## 📕 Project Overview

- `layouts/*` - The different layouts used on each page.
- `components/*` - Components used throughout the site.
- `utils/*` - Short for "utilities", a collection of helpful utilities or code for external services.
- `pages/api/*` - [API routes](https://nextjs.org/docs/api-routes/introduction) powering [`/@vercel/og`](https://github.com/vercel/og-image) dynamic OG image and [`/subscribe-convertkit`](https://github.com/tuanphungcz/nextjs-notion-blog-starter/blob/main/pages/api/subscribe-convertkit.tsx) newsletter subscription.
- `pages/blog/*` - Static pre-rendered blog pages that fetch information from the Notion API.
- `pages/*` - All other static pages.
- `public/*` - Static assets including images, fonts, and videos.
- `styles/*` - global styles and Tailwind.
- `data/*` - a simple file containing global data about the site.

## 🏃‍♂️ Running Locally

```bash
git clone https://github.com/tuanphungcz/blogfolio.co
cd blogfolio.co
npm install
npm run dev
```

Create a `.env` file similar to `.env.example` and include the appropriate keys.

## 🚀 Deploy to vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fhello-world&env=DATABASE_URL,GOOGLE_ID,GOOGLE_SECRET,NEXTAUTH_SECRET,AUTH_BEARER_TOKEN,VERCEL_PROJECT_ID,SERVICE_WORKER_API,NEXT_PUBLIC_IS_LOCALHOST)

```
DATABASE_URL=               # postgresql://postgres....

GOOGLE_ID=
GOOGLE_SECRET=

NEXTAUTH_SECRET=
AUTH_BEARER_TOKEN=
VERCEL_PROJECT_ID=

SERVICE_WORKER_API=

NEXT_PUBLIC_IS_LOCALHOST=true

```

## 💁‍♀️ How to use

- [Will be added]() - I wrote an article on how to use this starter to start your blog

## 📝 Credit & inspiration

This blog starter was inspired by all of these awesome open-sources

- [samuelkraft-next](https://github.com/samuelkraft/samuelkraft-next) by [@samuelkraft](https://github.com/samuelkraft)
- [leerob.io](https://github.com/leerob/leerob.io) by [@leerob](https://github.com/leerob)
- [Next.js Notion Starter Kit](https://github.com/transitive-bullshit/nextjs-notion-starter-kit) by [@transitive-bullshit](https://github.com/transitive-bullshit)
- [braydoncoyer.dev](https://github.com/braydoncoyer/braydoncoyer.dev) by [@braydoncoyer](https://github.com/braydoncoyer/braydoncoyer)
