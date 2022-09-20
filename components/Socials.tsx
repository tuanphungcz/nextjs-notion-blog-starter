import Image from 'next/image';

export default function Socials({ blog }) {
  const socials = [
    {
      name: 'Twitter',
      href: blog?.twitter,
      icon: '/socials/twitter.svg'
    },
    {
      name: 'GitHub',
      href: blog?.github,
      icon: '/socials/github.svg'
    },
    {
      name: 'LinkedIn',
      href: blog?.linkedin,
      icon: '/socials/linkedin.svg'
    }
  ];

  return (
    <div className="flex justify-center space-x-6 md:order-2">
      {socials.map(item => (
        <a
          key={item.name}
          href={item.href}
          className="text-gray-400 transform hover:text-gray-500 filter hover:contrast-0"
          target="_blank"
          rel="noreferrer"
        >
          <span className="sr-only">{item.name}</span>
          <Image
            src={item.icon}
            alt="social-icon"
            width={24}
            height={24}
            objectFit="cover"
          />
        </a>
      ))}
    </div>
  );
}
