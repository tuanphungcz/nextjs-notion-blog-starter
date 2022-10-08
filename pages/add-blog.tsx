import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import EditForm from '../components/EditForm';
import Container from '../components/base/Container';
import AppNavbar from 'layouts/AppNavbar';
import { fetcher, getRandomArbitrary } from 'lib/utils';
import { useEffect } from 'react';
import slugify from 'slugify';

const random2Numbers = getRandomArbitrary(0, 100).toFixed();

export default function Index() {
  const { status, data: session } = useSession();

  const autoSlug = slugify(session?.user?.name || '').toLowerCase() + random2Numbers;
  const { register, handleSubmit, setValue, watch, control, formState } = useForm({
    defaultValues: {
      slug: autoSlug
    }
  });
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status]);

  const onSubmitForm = async (values: any) => {
    await fetcher('/api/create-blog', {
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });

    router.reload();
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
