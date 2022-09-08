import { getSession } from 'next-auth/react';
import prisma from 'utils/prisma';

const updateBlog = async (req: any, res: any) => {
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

    if (!session?.user?.email) {
      return res.status(401);
    }

    const profile = await prisma.blogWebsite.update({
      where: {
        email: session.user.email
      },
      data: {
        updatedAt: new Date(),
        email: session.user.email,
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
      }
    });

    return res.status(200).json(profile);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export default updateBlog;
