interface CustomResponse extends Response {
  json: () => Promise<any>;
  error?: { code: string; projectId: string; message: string };
}

export const addDomain = async (domain: string): Promise<CustomResponse> => {
  return await fetch(
    `https://api.vercel.com/v9/projects/${process.env.VERCEL_PROJECT_ID}/domains`,
    {
      body: `{\n  "name": "${domain}"\n}`,
      headers: {
        Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`,
        'Content-Type': 'application/json'
      },
      method: 'POST'
    }
  ).then(res => res.json());
};

export const removeDomain = async (domain: string) => {
  return await fetch(
    `https://api.vercel.com/v9/projects/${process.env.VERCEL_PROJECT_ID}/domains/${domain}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`
      },
      method: 'DELETE'
    }
  ).then(res => res.json());
};

export const createDomain = async (domain: string) => {
  return await fetch(
    `https://api.vercel.com/v9/projects/${process.env.VERCEL_PROJECT_ID}/domains`,
    {
      headers: {
        Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`
      },
      body: `{\n  "name": "${domain}"\n}`,
      method: 'POST'
    }
  ).then(res => res.json());
};

export const getDomainConfig = async (domain: string) => {
  return await fetch(`https://api.vercel.com/v4/domains/${domain}/config`, {
    headers: {
      Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`
    },
    method: 'GET'
  }).then(res => res.json());
};
