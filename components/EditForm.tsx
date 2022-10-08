import { Input, TextArea } from './base/Form';
import Card from './base/Card';

import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconHome
} from '@tabler/icons';

export default function EditForm({
  blog,
  register,
  handleSubmit,
  formState,
  setValue,
  onSubmitForm,
  control
}: any) {
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

        {/* <div className="p-8 border-b md:col-span-1">
          <div className="text-lg font-medium leading-6 text-gray-900">
            Online presence
          </div>
          <div className="mt-2 text-sm text-gray-500">
            Where are you active on the web?
          </div>
        </div>
        <div className="p-8 mt-5 space-y-6 border-b md:mt-0 md:col-span-2">
          {defaultSocialInputs.length > 0 &&
            defaultSocialInputs.map(input => (
              <Input
                {...input}
                label={input.label}
                name={input.id}
                register={register}
                key={input.id}
                error={formState?.errors[input.id]}
                setValue={setValue}
                prefix={input?.prefix || ''}
              />
            ))}
        </div> */}

        <div className="p-8 border-b md:col-span-1">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Notion integration
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            This is your Notion database ID. You can find it in the URL of your database.
          </p>
        </div>

        <div className="p-8 mt-5 space-y-6 md:mt-0 md:col-span-2">
          {integrations.length > 0 &&
            integrations.map(input => (
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
          <button
            type="submit"
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            <div>{blog?.slug ? 'Update blog' : ' Create blog'}</div>
          </button>
        </div>
      </Card>
    </form>
  );
}

const defaultSocialInputs = [
  {
    id: 'github',
    label: 'Github',
    prefix: <IconBrandGithub className="w-4" />,
    placeholder: 'username',
    helper: 'Your github blog url'
  },
  {
    id: 'linkedin',
    label: 'Linkedin',
    prefix: <IconBrandLinkedin className="w-4" />,
    placeholder: 'username',
    helper: 'Your linkedin blog url'
  },
  {
    id: 'website',
    label: 'Website',
    prefix: <IconHome className="w-4" />,
    placeholder: 'username',
    helper: 'Your website url'
  },

  {
    id: 'twitter',
    label: 'Twitter',
    prefix: <IconBrandTwitter className="w-4" />,
    placeholder: 'username',
    helper: 'Your twitter blog url'
  }
];

const defaultBaseInputs = [
  // {
  //   id: 'blogName',
  //   label: 'Blog name',
  //   component: Input,
  //   placeholder: '',
  //   helper: ''
  // },
  // {
  //   id: 'headerTitle',
  //   label: 'Header title',
  //   component: Input,
  //   placeholder: '',
  //   helper: ''
  // },
  {
    id: 'slug',
    label: 'slug',
    component: Input,
    placeholder: '',
    helper: ''
  },
  // {
  //   id: 'profileUrl',
  //   label: 'Profile Url',
  //   component: Input,
  //   placeholder: '',
  //   helper: ''
  // },

  // {
  //   id: 'headerDescription',
  //   label: 'Header description',
  //   component: Input,
  //   placeholder: '',
  //   helper: ''
  // },
  // {
  //   id: 'footerText',
  //   label: 'Footer text',
  //   component: Input,
  //   placeholder: '',
  //   helper: ''
  // },
  {
    id: 'settingData',
    label: 'Setting in JSON',
    component: TextArea,
    placeholder: '',
    helper: `
    This is an advanced setting, you can set the blog settings in JSON format.
    
    {"links":[{"name":"Articles","url":"/articles","template":3,"isDefault":true},{"name":"Projects","url":"/projects","isDefault":false},{"name":"Snippets","url":"/snippets","template":2,"isDefault":false}]}`
  }
];

const integrations = [
  {
    id: 'notionBlogDatabaseId',
    label: 'Notion blog database id',
    component: Input,
    placeholder: '',
    helper: ''
  },
  // {
  //   id: 'convertkitFormid',
  //   label: 'Convertkit form id',
  //   component: Input,
  //   placeholder: '',
  //   helper: ''
  // },
  // {
  //   id: 'convertkitApiKey',
  //   label: 'Convertkit api key',
  //   component: Input,
  //   placeholder: '',
  //   helper: ''
  // }
];
