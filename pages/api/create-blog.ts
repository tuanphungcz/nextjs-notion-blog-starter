import { getSession } from 'next-auth/react';
import slugify from 'slugify';
import prisma from 'lib/prisma';
import { getRandomArbitrary } from 'lib/utils';

const createBlog = async (req: any, res: any) => {
  try {
    const { slug, settingData, notionBlogDatabaseId } = req.body;

    const session = await getSession({ req });

    if (!session?.user?.email || !session?.user?.name) {
      return res.status(401);
    }

    const slugCount = await prisma.blogWebsite.count({
      where: { slug: slug.toLowerCase() }
    });

    if (slugCount > 0) {
      return res.status(400).json({ error: 'Slug already exists, please choose a different slug' });
    }

    const random2Numbers = getRandomArbitrary(0, 100).toFixed();

    const autoSlug = slugify(session?.user?.name).toLowerCase() + random2Numbers;

    const blog = await prisma.blogWebsite.create({
      data: {
        settingData,
        notionBlogDatabaseId,
        slug: slug || autoSlug,
        email: session.user.email,
        user: { connect: { email: session.user.email } }
      }
    });

    return res.status(200).json(blog);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

export default createBlog;
