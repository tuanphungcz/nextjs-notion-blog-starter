import { getSession } from 'next-auth/react';
import slugify from 'slugify';
import prisma from 'lib/prisma';
import { getRandomArbitrary } from 'lib/utils';

const createBlog = async (req: any, res: any) => {
  try {
    const {
      slug,
      headerTitle,
      profileUrl,
      headerDescription,
      footerText,
      ogBanner,
      blogName,
      settingData,
      github,
      twitter,
      linkedin,
      notionSecret,
      notionBlogDatabaseId,
      convertkitFormid,
      convertkitApiKey
    } = req.body;

    const session = await getSession({ req });

    if (!session?.user?.email || !session?.user?.name) {
      return res.status(401);
    }

    const random2Numbers = getRandomArbitrary(0, 100).toFixed();

    const autoSlug = slugify(session?.user?.name).toLowerCase() + random2Numbers;

    const profile = await prisma.blogWebsite.create({
      data: {
        headerTitle,
        profileUrl,
        headerDescription,
        footerText,
        ogBanner,
        settingData,
        blogName,
        github,
        twitter,
        linkedin,
        notionSecret,
        notionBlogDatabaseId,
        slug: slug || autoSlug,
        email: session.user.email,
        user: { connect: { email: session.user.email } },
        convertkitFormid,
        convertkitApiKey
      }
    });

    return res.status(200).json(profile);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

export default createBlog;
