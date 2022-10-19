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
      notionBlogDatabaseId: 'https://www.notion.so/phung/0074736e006c48828f4843fea835bd97',
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
    { "name": "Home", "url": "/" },
    {
      "name": "Articles",
      "url": "/articles",
      "description": "Welcome to my blog. Here you can find all my articles.",
      "isDefaultPosts": true
    },
    {
      "name": "Snippets",
      "url": "/snippets",
      "description": "There are my collection of code snippets that I find useful. I hope you find them useful too.",
      "isDefaultPosts": false
    },
    { "name": "Github repo", "url": "https://github.com/tuanphungcz/blogfolio.co" }
  ],
  "site": {
    "description": "Software developer with a passion for learning new things.",
    "title": "Software developer",
    "profileUrl": "https://i.postimg.cc/hP4QqFTF/joseph-gonzalez-i-Fg-Rcq-Hznqg-unsplash-1-1.jpg",
    "blogName": "Software developer",
    "socials": {
      "github": "https://github.com/tuanphungcz/blogfolio.co",
      "twitter": "https://github.com/tuanphungcz/blogfolio.co",
      "linkedIn": "https://github.com/tuanphungcz/blogfolio.co"
    }
  },
  "blocks": [
    {
      "type": "ABOUT_ME",
      "title": "Software developer with a passion for learning new things.",
      "description": "I'm John Smith — A Software developer based in Prague . I focus on fit and finish to solve problems and create seamless experiences. I also enjoy working with Notion and OSS stuff. <u><a href='https://github.com/tuanphungcz/blogfolio.co' target='_blank'>Let's get in touch.</a></u>"
    }
  ]
}

`;
