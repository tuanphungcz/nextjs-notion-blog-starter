import { getSession } from 'next-auth/react';
import prisma, { blogSelect } from 'lib/prisma';

const getBlogs = async (req: any, res: any) => {
  try {
    const session = await getSession({ req });
    const blogs = await prisma.blogWebsite.findMany({
      where: { email: session?.user.email },
      select: { ...blogSelect, id: true }
    });

    return res.status(200).json(blogs);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

export default getBlogs;
