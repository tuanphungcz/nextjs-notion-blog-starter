import { Input, TextArea } from './base/Form';
import Card from './base/Card';
import { IconExternalLink } from '@tabler/icons';
import { PrimaryButton } from './base/Button';
import NewTabLink from './base/NewTabLink';

export default function EditForm({
  blog,
  register,
  handleSubmit,
  formState,
  setValue,
  onSubmitForm,
  control
}: any) {
  const defaultBaseInputs = getDefaultBaseInputs(blog);
  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="w-full space-y-8">
      <Card className="bg-white sm:rounded">
        <div className="p-8 border-b md:col-span-1">
          <div className="text-lg font-medium leading-6 text-gray-900">Blog Settings</div>
          <div className="mt-2 text-sm text-gray-500">
            This information is the most prominent information displayed publicly on your
            blog.{' '}
          </div>
        </div>
        <div className="p-8 mt-5 space-y-6 border-b md:mt-0 md:col-span-2">
          {defaultBaseInputs.map((input: any) => (
            <input.component
              {...input}
              label={input.label}
              name={input.id}
              register={register}
              key={input.id}
              error={formState?.errors[input.id]}
              setValue={setValue}
              placeholder={input?.placeholder || ''}
              helper={input?.helper || ''}
              control={control}
            />
          ))}
        </div>
        <div className="p-8 border-b md:col-span-1">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Site settings in JSON
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            This is the settings for the website. You can edit it in JSON format.
          </p>
        </div>

        <div className="p-8 mt-5 space-y-6 md:mt-0 md:col-span-2">
          {JsonSettings.map(input => (
            <input.component
              {...input}
              label={input.label}
              name={input.id}
              register={register}
              key={input.id}
              error={formState?.errors[input.id]}
              setValue={setValue}
            />
          ))}
        </div>
        <div className="flex justify-end p-8 space-x-4">
          <PrimaryButton type="submit">
            {blog?.slug ? 'Update blog' : ' Create blog'}
          </PrimaryButton>
        </div>
      </Card>
    </form>
  );
}

const getDefaultBaseInputs = blog => [
  {
    id: 'slug',
    label: (
      <div className="flex items-center space-x-2">
        <div>Blogfolio domain</div>
        {blog?.slug && (
          <NewTabLink
            href={
              process.env.NEXT_PUBLIC_IS_LOCALHOST
                ? `http://${blog.slug}.localhost:3000`
                : `https://${blog.slug}.blogfolio.co`
            }
          >
            <IconExternalLink className="w-4" />
          </NewTabLink>
        )}
      </div>
    ),
    component: Input,
    placeholder: '',
    helper: '',
    suffix: '.blogfolio.co'
  },
  {
    id: 'notionBlogDatabaseId',
    label: 'Notion database Url',
    component: Input,
    placeholder: '',
    helper: (
      <div>
        <div>
          You can clone this template to get started:{' '}
          <NewTabLink
            href="https://phung.notion.site/6a05e6e596ac4bc6b591734f5c3d9850"
            className="font-semibold hover:underline"
          >
            https://phung.notion.site/6a05e6e596ac4bc6b591734f5c3d9850
          </NewTabLink>
        </div>
        <div className="mt-1" /> or copy this database id for testing{' '}
        <span className="font-semibold">6a05e6e596ac4bc6b591734f5c3d9850</span>
      </div>
    )
  }
];

const JsonSettings = [
  {
    id: 'settingData',
    label: 'Setting in JSON',
    component: TextArea,
    placeholder: '',
    rows: 10,

    helper: `This is an advanced setting, you can set the blog settings in JSON format.`
  }
];
