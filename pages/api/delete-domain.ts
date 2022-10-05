import { removeDomain } from 'lib/domains';
import prisma from 'lib/prisma';

const deleteCustomDomain = async (req: any, res: any) => {
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
    return res.status(401).json(error);
  }
};

export default deleteCustomDomain;
