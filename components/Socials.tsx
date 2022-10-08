import { IconBrandGithub, IconBrandLinkedin, IconBrandTwitter } from '@tabler/icons';

export default function Socials({ blog }) {
  const socialIcons = blog.settingData?.site?.socials;

  const socials = [
    {
      name: 'Twitter',
      href: socialIcons?.twitter,
      icon: (
        <IconBrandTwitter className="w-6 text-gray-400 transition cursor-pointer hover:text-gray-600" />
      )
    },
    {
      name: 'GitHub',
      href: socialIcons?.github,
      icon: (
        <IconBrandGithub className="w-6 text-gray-400 transition cursor-pointer hover:text-gray-600" />
      )
    },
    {
      name: 'LinkedIn',
      href: socialIcons?.linkedIn,
      icon: (
        <IconBrandLinkedin className="w-6 text-gray-400 transition cursor-pointer hover:text-gray-600" />
      )
    }
  ];

  return (
    <div className="flex justify-center space-x-6 md:order-2">
      {socials.map(
        item =>
          item?.href && (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-400 transform hover:text-gray-500 filter hover:contrast-0"
              target="_blank"
              rel="noreferrer"
            >
              <span className="sr-only">{item.name}</span>
              {item.icon}
            </a>
          )
      )}
    </div>
  );
}
