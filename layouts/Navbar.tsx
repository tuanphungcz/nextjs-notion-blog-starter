import AppDropdown from 'components/AppDropdown';
import Container from 'components/base/Container';
import Socials from 'components/Socials';
import Link from 'next/link';

// export const navSettings = {
//   links: [
//     { name: 'Articles', url: '/', template: 3, isDefault: true },
//     { name: 'Projects', url: '/projects', isDefault: false },
//     { name: 'Snippets', url: '/snippets', template: 2, isDefault: false }
//   ]
// };

export default function Navbar({ blog }) {
  const links = blog.settingData?.links || [];
  const site = blog.settingData?.site;

  return (
    <div className="fixed z-10 w-full bg-white border-b">
      <Container>
        <div className="flex justify-between w-full py-4 ">
          <Link href="/" passHref>
            <div className="flex items-center space-x-4 cursor-pointer">
              {site?.profileUrl && (
                <img
                  src={site.profileUrl}
                  className="w-8 h-8 mx-auto rounded-full"
                  alt="profile"
                />
              )}
              <div className="text-xl font-bold ">{site?.blogName}</div>
            </div>
          </Link>
          <div className="flex items-center space-x-8 cursor-pointer">
            <div className="flex space-x-4">
              {links?.length > 1 ? (
                <AppDropdown links={links} />
              ) : (
                <Socials blog={blog} />
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
