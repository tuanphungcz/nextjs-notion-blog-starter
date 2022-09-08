import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient();
  }
  prisma = (global as any).prisma;
}

export default prisma;

export const blogSelect = {
  title: true,
  author: true,
  slug: true,
  headerTitle: true,
  profileUrl: true,
  headerDescription: true,
  footerText: true,
  language: true,
  locale: true,
  ogBanner: true,
  github: true,
  twitter: true,
  linkedin: true,
  notionSecret: true,
  notionBlogDatabaseId: true,
  convertkitFormid: true,
  websiteUrl: true,
  convertKitApiKey: true,
  umamiId: true,
  umamiUrl: true
};

export const getProfile = async (slug: string) => {
  const profile = await prisma.blogWebsite.findFirst({
    where: { slug },
    select: blogSelect
  });

  return profile;
};

export const getProfileByEmail = async (email: string) => {
  const profile = await prisma.blogWebsite.findFirst({
    where: { email },
    select: blogSelect
  });

  return profile;
};
