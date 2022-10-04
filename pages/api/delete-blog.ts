import { getSession } from 'next-auth/react';
import prisma from 'lib/prisma';

const deleteBlog = async (req: any, res: any) => {
  try {
    const { id } = req.body;

    const session = await getSession({ req });

    if (!session?.user?.email) {
      return res.status(401);
    }

    const blog = await prisma.blogWebsite.findFirst(id);

    if (blog.email !== session?.user?.email) {
      return res.status(402);
    }

    await prisma.blogWebsite.delete({ where: { id } });

    return res.status(200).json('Blog was removed');
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

export default deleteBlog;
