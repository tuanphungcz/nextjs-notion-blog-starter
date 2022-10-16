import AppDropdown from 'components/AppDropdown';
import Socials from 'components/Socials';
import Link from 'next/link';

// export const navSettings = {
//   links: [
//     { name: 'Articles', url: '/', template: 3, isDefaultPosts: true },
//     { name: 'Projects', url: '/projects', isDefaultPosts: false },
//     { name: 'Snippets', url: '/snippets', template: 2, isDefaultPosts: false }
//   ]
// };

export default function BlogNavbar({ blog }) {
  return (
    <div className="flex justify-between w-full py-4 ">
      <Link href="/" passHref>
        <div className="flex items-center space-x-4 cursor-pointer">
          {blog.settingData?.site?.profileUrl && (
            <img
              src={blog.settingData.site.profileUrl}
              className="w-8 h-8 mx-auto rounded-full"
              alt="profile"
            />
          )}
          <div className="text-lg font-bold ">{blog.settingData?.site?.blogName}</div>
        </div>
      </Link>
      <div className="flex items-center space-x-8 cursor-pointer">
        <div className="flex space-x-4">
          {blog.settingData?.links?.length > 1 ? (
            <AppDropdown links={blog.settingData?.links} />
          ) : (
            <Socials socialIcons={blog.settingData?.site?.socials} />
          )}
        </div>
      </div>
    </div>
  );
}
