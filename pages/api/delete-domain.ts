import { removeDomain } from 'lib/domains';
import prisma from 'lib/prisma';

const createCustomDomain = async (req: any, res: any) => {
  const { id, customDomain } = req.body;

  try {
    await removeDomain(customDomain);
    await prisma.blogWebsite.update({
      where: {
        id
      },
      data: {
        customDomain: null
      }
    });

    return res.status(200).json('deleted');
  } catch (error) {
    console.log(error.data);

    return res.status(401).json(error);
  }
};

export default createCustomDomain;
