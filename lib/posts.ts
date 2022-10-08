const BASE_API = process.env.SERVICE_WORKER_API;

export const getAllPosts = async (notionBlogDatabaseId: string) => {
  return await fetch(`${BASE_API}/v1/table/${notionBlogDatabaseId}`, {
    // headers: {
    //   Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`
    // },
    // method: 'GET'
  }).then(res => res.json());
};

export const getPageById = async (pageId: string) => {
  return await fetch(`${BASE_API}/v1/page/${pageId}`, {
    // headers: {
    //   Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`
    // },
    // method: 'GET'
  }).then(res => res.json());
};
