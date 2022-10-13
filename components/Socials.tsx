import { IconBrandGithub, IconBrandLinkedin, IconBrandTwitter } from '@tabler/icons';
import NewTabLink from './base/NewTabLink';

export default function Socials({ blog }) {
  const socialIcons = blog.settingData?.site?.socials;

  const socials = [
    {
      name: 'Twitter',
      href: socialIcons?.twitter,
      icon: (
        <IconBrandTwitter className="w-full h-full text-gray-400 transition cursor-pointer hover:text-gray-600" />
      )
    },
    {
      name: 'GitHub',
      href: socialIcons?.github,
      icon: (
        <IconBrandGithub className="w-full h-full text-gray-400 transition cursor-pointer hover:text-gray-600" />
      )
    },
    {
      name: 'LinkedIn',
      href: socialIcons?.linkedIn,
      icon: (
        <IconBrandLinkedin className="w-full h-full text-gray-400 transition cursor-pointer hover:text-gray-600" />
      )
    }
  ];

  return (
    <div className="flex justify-center space-x-6">
      {socials.map(
        item =>
          item?.href && (
            <NewTabLink
              key={item.name}
              href={item.href}
              className="px-2 transform rounded-full h-9 w-9 text-gray-40 hover:bg-gray-50 hover:text-gray-500 filter"
            >
              <span className="sr-only">{item.name}</span>
              {item.icon}
            </NewTabLink>
          )
      )}
    </div>
  );
}
