import { createDomain } from 'lib/domains';
import prisma from 'lib/prisma';

// https://vercel.com/docs/rest-api#endpoints/domains

const createCustomDomain = async (req: any, res: any) => {
  const { id, customDomain } = req.body;

  try {
    const domainCount = await prisma.blogWebsite.count({
      where: { customDomain: customDomain.toLowerCase() }
    });

    if (domainCount > 0) {
      console.log('domainCount');
      return res
        .status(400)
        .json({ error: 'Domain is already assigned to a different blog' });
    }

    const result = await createDomain(customDomain);
    console.log(result);

    await prisma.blogWebsite.update({
      where: {
        id
      },
      data: {
        customDomain
      }
    });

    return res.status(200).json({ message: 'Domain created' });
  } catch (error) {
    console.log(error);
    return res.status(401).json(error);
  }
};

export default createCustomDomain;
