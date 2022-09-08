import { getSession } from 'next-auth/react';
import slugify from 'slugify';
import prisma from 'utils/prisma';

function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const createBlog = async (req: any, res: any) => {
  try {
    const {
      title,
      author,
      slug,
      headerTitle,
      profileUrl,
      headerDescription,
      footerText,
      language,
      locale,
      ogBanner,
      github,
      twitter,
      linkedin,
      notionSecret,
      notionBlogDatabaseId,
      convertkitFormid,
      websiteUrl,
      convertKitApiKey,
      umamiId,
      umamiUrl
    } = req.body;

    const session = await getSession({ req });

    if (!session?.user?.email || !session?.user?.name) {
      return res.status(401);
    }

    const random2Numbers = getRandomArbitrary(0, 100).toFixed();

    const autoSlug = slugify(session?.user?.name).toLowerCase() + random2Numbers;

    const profile = await prisma.blogWebsite.create({
      data: {
        title,
        author,
        headerTitle,
        profileUrl,
        headerDescription,
        footerText,
        language,
        locale,
        ogBanner,
        github,
        twitter,
        linkedin,
        notionSecret,
        notionBlogDatabaseId,
        websiteUrl: websiteUrl || '',
        convertkitFormid: convertkitFormid || '',
        convertKitApiKey,
        umamiId,
        umamiUrl,
        slug: slug || autoSlug,

        email: session.user.email,
        user: { connect: { email: session.user.email } }
      }
    });

    console.log('api called', profile);

    return res.status(200).json(profile);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

export default createBlog;
