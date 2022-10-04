import { createDomain } from 'lib/domains';
import prisma from 'lib/prisma';

// https://vercel.com/docs/rest-api#endpoints/domains

const createCustomDomain = async (req: any, res: any) => {
  const { id, customDomain } = req.body;

  try {
    await createDomain(customDomain);
    await prisma.blogWebsite.update({
      where: {
        id
      },
      data: {
        customDomain
      }
    });

    return res.status(200).json('deleted');
  } catch (error) {
    console.log(error);
    return res.status(401).json(error);
  }
};

export default createCustomDomain;
