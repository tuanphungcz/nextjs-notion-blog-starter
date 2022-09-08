import { Input } from '../components/Form';
import Card from '../components/Card';

import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconHome
} from '@tabler/icons';

const defaultSocialInputs = [
  {
    id: 'github',
    label: 'Github',
    prefix: <IconBrandGithub className="w-4" />,
    placeholder: 'username',
    helper: 'Your github profile url'
  },
  {
    id: 'linkedin',
    label: 'Linkedin',
    prefix: <IconBrandLinkedin className="w-4" />,
    placeholder: 'username',
    helper: 'Your linkedin profile url'
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
    helper: 'Your twitter profile url'
  }
];

const defaultBaseInputs = [
  {
    id: 'title',
    label: 'title',
    component: Input,
    placeholder: '',
    helper: ''
  },
  {
    id: 'author',
    label: 'author',
    component: Input,
    placeholder: '',
    helper: ''
  },
  {
    id: 'headerTitle',
    label: 'headerTitle',
    component: Input,
    placeholder: '',
    helper: ''
  },
  {
    id: 'profileUrl',
    label: 'profileUrl',
    component: Input,
    placeholder: '',
    helper: ''
  },
  {
    id: 'headerDescription',
    label: 'headerDescription',
    component: Input,
    placeholder: '',
    helper: ''
  },
  {
    id: 'footerText',
    label: 'footerText',
    component: Input,
    placeholder: '',
    helper: ''
  },
  {
    id: 'language',
    label: 'language',
    component: Input,
    placeholder: '',
    helper: ''
  },
  {
    id: 'locale',
    label: 'locale',
    component: Input,
    placeholder: '',
    helper: ''
  },
  {
    id: 'ogBanner',
    label: 'ogBanner',
    component: Input,
    placeholder: '',
    helper: ''
  }
];

const integrations = [
  {
    id: 'notionSecret',
    label: 'notionSecret ',
    component: Input,
    placeholder: '',
    helper: ''
  },
  {
    id: 'notionBlogDatabaseId',
    label: 'notionBlogDatabaseId ',
    component: Input,
    placeholder: '',
    helper: ''
  },
  {
    id: 'convertKitApiKey',
    label: 'convertKitApiKey ',
    component: Input,
    placeholder: '',
    helper: ''
  },
  {
    id: 'umamiId',
    label: 'Umami id ',
    component: Input,
    placeholder: '',
    helper: ''
  },
  {
    id: 'umamiUrl',
    label: 'Umami Url ',
    component: Input,
    placeholder: '',
    helper: ''
  }
];

export default function EditForm({
  profile,
  register,
  handleSubmit,
  formState,
  setValue,
  session,
  onSubmitForm,
  control
}: any) {
  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div className="space-y-8">
          <Card>
            <div className="mb-4 md:col-span-1">
              <h3 className="text-xl font-medium leading-6 text-gray-900">Profile</h3>
              <p className="mt-1 text-sm text-gray-500">
                This information is the most prominent information displayed publicly on
                your profile.
              </p>
            </div>
            <div className="mt-5 space-y-6 md:mt-0 md:col-span-2">
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
          </Card>

          <Card className="px-4 py-5 bg-white sm:rounded sm:p-6">
            <div className="mb-4 md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Online presence
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Where are you active on the web?
              </p>
            </div>
            <div className="mt-5 space-y-6 md:mt-0 md:col-span-2">
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
            </div>
          </Card>

          <Card className="px-4 py-5 bg-white sm:rounded sm:p-6">
            <div className="mb-4 md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Integrations
              </h3>
              <p className="mt-1 text-sm text-gray-500">Add integrations</p>
            </div>
            <div className="mt-5 space-y-6 md:mt-0 md:col-span-2">
              {integrations.length > 0 &&
                integrations.map(input => (
                  <Input
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
          </Card>

          <div className="flex justify-end space-x-4">
            <button type="submit">
              <div>{profile?.slug ? 'Update profile' : ' Create Profile'}</div>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
