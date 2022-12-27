import siteData from 'data/siteData';
import Image from 'next/image';
import UseAnimations from 'react-useanimations';
import github from 'react-useanimations/lib/github';
import linkedin from 'react-useanimations/lib/linkedin';
import twitter from 'react-useanimations/lib/twitter';

const socials = [
  {
    name: 'Twitter',
    href: siteData.twitter,
    animation: twitter
  },
  {
    name: 'LinkedIn',
    href: siteData.linkedin,
    animation: linkedin
  },
  {
    name: 'GitHub',
    href: siteData.github,
    animation: github
  }
];

export default function Socials() {
  return (
    <div className="flex justify-center space-x-6 md:order-2">
      {socials.map(item => (
        <a
          key={item.name}
          href={item.href}
          className="transform  filter hover:contrast-50"
          target="_blank"
          rel="noreferrer"
        >
          <span className="sr-only">{item.name}</span>
          <UseAnimations animation={item.animation} strokeColor="#333" />
        </a>
      ))}
    </div>
  );
}
