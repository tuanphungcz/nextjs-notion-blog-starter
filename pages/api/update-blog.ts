import { getSession } from 'next-auth/react';
import prisma from 'lib/prisma';

const updateBlog = async (req: any, res: any) => {
  try {
    const { id, slug, notionBlogDatabaseId, settingData } = req.body;

    const session = await getSession({ req });

    if (!session?.user?.email) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const blog = await prisma.blogWebsite.findFirst({
      where: { id }
    });

    const slugCount = await prisma.blogWebsite.count({
      where: { slug: slug.toLowerCase() }
    });

    console.log('slugCount', blog.slug, slug);
    console.log('blog.slug !== slug.toLowerCase()', blog.slug !== slug.toLowerCase());

    if (slugCount > 0 && blog.slug !== slug.toLowerCase()) {
      return res
        .status(400)
        .json({ error: 'Slug already exists, please choose a different slug' });
    }

    if (blog.email !== session?.user?.email) {
      return res.status(402).json({ error: 'Not the owner of this blog' });
    }

    const profile = await prisma.blogWebsite.update({
      where: {
        id
      },
      data: {
        updatedAt: new Date(),
        email: blog.email,
        slug,
        settingData,
        notionBlogDatabaseId
      }
    });

    return res.status(200).json(profile);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export default updateBlog;
