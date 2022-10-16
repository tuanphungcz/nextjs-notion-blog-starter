import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import EditForm from '../components/EditForm';
import Container from '../components/base/Container';
import AppNavbar from 'layouts/AppNavbar';
import { fetcher, getRandomArbitrary } from 'lib/utils';
import { useEffect } from 'react';
import slugify from 'slugify';
import toast from 'react-hot-toast';

const random2Numbers = getRandomArbitrary(0, 100).toFixed();

export default function Index() {
  const { status, data: session } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status]);

  const autoSlug = slugify(session?.user?.name || '').toLowerCase() + random2Numbers;
  const { register, handleSubmit, setValue, watch, control, formState } = useForm({
    defaultValues: {
      slug: autoSlug,
      notionBlogDatabaseId: 'https://phung.notion.site/6a05e6e596ac4bc6b591734f5c3d9850',
      settingData: basicJson
    }
  });
  const router = useRouter();

  const onSubmitForm = async (values: any) => {
    const res = await fetcher('/api/create-blog', {
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });

    if (res?.error) {
      return toast.error(res?.error);
    }

    toast.success('Blog updated successfully');
    router.push('/edit-blog/' + res?.slug);
  };

  const editFormProps = {
    blog: null,
    register,
    handleSubmit,
    setValue,
    watch,
    onSubmitForm,
    control,
    formState
  };

  return (
    <>
      <AppNavbar />
      <div className="py-16 bg-gray-100">
        <Container small>
          <div className="space-y-8 ">
            <EditForm {...editFormProps} />
          </div>
        </Container>
      </div>
    </>
  );
}

const basicJson = `
{
  "links": [
    {
      "name": "Articles",
      "url": "/articles",
      "description": "Welcome to my blog. Here you can find all my articles.",
      "isDefaultPosts": true,
      "isSearchVisible": true,
      "isTagsVisible": true,
      "cols": 3
    },
    {
      "name": "Projects",
      "url": "/projects",
      "description": "I have worked on a few projects over the years. Here are some of them.",
      "isDefaultPosts": false,
      "isSearchVisible": false,
      "isTagsVisible": true,
      "cols": 2
    },
    {
      "name": "Snippets",
      "url": "/snippets",
      "description": "There are my collection of code snippets that I find useful. I hope you find them useful too.",
      "isDefaultPosts": false,
      "isSearchVisible": true,
      "isTagsVisible": true,
      "cols": 3
    }
  ],
  "site": {
    "headerDescription": "Notion-powered blog starter with Nextjs and Tailwind ",
    "headerTitle": "Hello, this is a blog starter",
    "profileUrl": "https://raw.githubusercontent.com/tuanphungcz/blogfolio.co/main/public/nextjs-logo.png",
    "footerText": "© All rights reserved",
    "convertkitApiKey": "",
    "convertkitFormid": "",
    "blogName": "Blog starter",
    "socials": {
      "github": "https://github.com/tuanphungcz/blogfolio.co",
      "twitter": "https://github.com/tuanphungcz/blogfolio.co",
      "linkedIn": "https://github.com/tuanphungcz/blogfolio.co"
    }
  }
}
`;
