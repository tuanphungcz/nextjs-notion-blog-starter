import Socials from 'components/Socials';
import Link from 'next/link';

export default function Footer({ blog }) {
  return (
    <footer className="py-8 mt-16 bg-white border-t">
      <div className="space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
        <div className="flex justify-center space-x-4">
          {blog.settingData?.links.map(link => (
            <Link href={link?.url} key={link?.url}>
              <div className="text-sm font-medium text-gray-600 cursor-pointer hover:text-gray-900">
                {link?.name}
              </div>
            </Link>
          ))}
        </div>
        <div className="flex justify-center">
          <Socials socialIcons={blog.settingData?.site?.socials} />
        </div>
      </div>
    </footer>
  );
}
