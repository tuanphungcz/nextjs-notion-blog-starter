import { getDomainConfig } from 'lib/domains';

// https://vercel.com/docs/rest-api#endpoints/domains

const getDomainConfigApi = async (req: any, res: any) => {
  const { domain } = req.query;

  try {
    const result = await getDomainConfig(domain);

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(401).json(error);
  }
};

export default getDomainConfigApi;
