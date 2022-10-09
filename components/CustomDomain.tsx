import { IconExternalLink, IconLink, IconTrash } from '@tabler/icons';
import { fetcher } from 'lib/utils';
import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import Card from './base/Card';
import { Input } from './base/Form';

export default function CustomDomain({ blog }) {
  const [customDomainValue, setCustomDomainValue] = useState(blog?.customDomain);
  const router = useRouter();

  const onCreateCustomDomain = async () => {
    const res = await fetcher('/api/create-domain', {
      body: JSON.stringify({ id: blog.id, customDomain: customDomainValue }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });

    if (res?.error) {
      return toast.error(res.error);
    }

    router.reload();
    toast.success('Custom domain created successfully');
  };

  const onDeleteCustomDomain = async () => {
    if (confirm('Are you sure you want to remove this domain?'))
      await fetcher('/api/delete-domain', {
        body: JSON.stringify({ id: blog.id, customDomain: customDomainValue }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      });

    router.reload();
    toast.success('Custom domain deleted successfully');
  };

  const { data: domainConfig }: any = useSWR(
    blog?.customDomain && `/api/get-domain-config/${blog.customDomain}`,
    fetcher
  );

  return (
    <Card className="px-4 py-5 bg-white sm:rounded">
      <div className="p-8 border-b md:col-span-1">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Custom domain</h3>
        <p className="mt-2 text-sm text-gray-500">
          {!blog?.customDomain
            ? 'Add custom domain'
            : 'You can map your domain to Blogfolio by adding the following DNS record.'}
        </p>
      </div>

      <div>
        {!blog?.customDomain && (
          <div className="p-8 mt-5 space-y-6 md:mt-0 md:col-span-2">
            <Input
              label="Custom domain"
              value={customDomainValue}
              onChange={e => setCustomDomainValue(e.target.value)}
              prefix={<IconLink />}
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={onCreateCustomDomain}
                type="button"
                className="px-4 py-1.5 text-sm font-medium text-white bg-black border border-transparent rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              >
                <div>Add domain</div>
              </button>
            </div>
          </div>
        )}

        {blog?.customDomain && (
          <div className="p-8 space-y-4">
            <div className="flex justify-between pb-4">
              <div className="">
                <a
                  href={`https://${blog?.customDomain}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="flex items-center p-2 space-x-2 text-xl font-medium truncate transition rounded cursor-pointer hover:bg-gray-100">
                    <div>{blog?.customDomain}</div> <IconExternalLink />
                  </div>
                </a>

                <div className="flex items-center px-2">
                  <div
                    className={`flex-shrink-0 mr-2 h-4 w-4 rounded-full ${
                      domainConfig?.misconfigured ? 'bg-orange-400' : 'bg-green-400'
                    }`}
                  ></div>
                  <div className="text-sm font-normal text-gray-500">
                    {domainConfig?.misconfigured ? 'Misconfigured' : 'Domain live'}
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <button
                  onClick={onDeleteCustomDomain}
                  type="button"
                  className="px-4 py-1.5 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                >
                  <div className="flex items-center space-x-2">
                    <IconTrash className="w-4 text-white" />
                    <span>Delete</span>
                  </div>
                </button>
              </div>
            </div>
            <div className="overflow-hidden overflow-x-auto border-gray-200 rounded-sm">
              <table className="w-full border rounded-lg table-auto">
                <thead className="text-sm text-center text-gray-500 bg-gray-200">
                  <tr className="text-sm">
                    <th className="px-4 py-2">Record</th>
                    <th className="px-4 py-2">Host name</th>
                    <th className="px-4 py-2">Value</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  <tr className="text-sm">
                    <td className="px-4 py-2 border">A</td>
                    <td className="px-4 py-2 border">@</td>
                    <td className="px-4 py-2 border">76.76.21.21</td>
                  </tr>
                </tbody>
                <tbody className="text-center rounded">
                  <tr className="text-sm rounded ">
                    <td className="px-4 py-2 border">CNAME</td>
                    <td className="px-4 py-2 border">www</td>
                    <td className="px-4 py-2 border">cname.vercel-dns.com</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
