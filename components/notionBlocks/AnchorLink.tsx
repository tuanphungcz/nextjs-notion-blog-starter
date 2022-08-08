import { useEffect, useState } from 'react';
import { formatHashLink } from 'utils/formatHashLink';

type Props = {
  children: JSX.Element;
  text: string;
};

export default function AnchorLink({ children, text }: Props) {
  const [hashLink, setHashLink] = useState<string>();

  useEffect(() => {
    setHashLink(formatHashLink(text));
  }, [text]);

  return (
    <div className="flex items-center justify-start space-x-2 group">
      {children}
      <div className="opacity-10 group-hover:opacity-50">
        <a className="text-gray-600 " id={hashLink} href={`#${hashLink}`}>
          <svg className="hidden w-7 h-7 md:block" fill="none" viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16.75 13.25L18 12C19.6569 10.3431 19.6569 7.65685 18 6V6C16.3431 4.34315 13.6569 4.34315 12 6L10.75 7.25"
            ></path>
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7.25 10.75L6 12C4.34315 13.6569 4.34315 16.3431 6 18V18C7.65685 19.6569 10.3431 19.6569 12 18L13.25 16.75"
            ></path>
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14.25 9.75L9.75 14.25"
            ></path>
          </svg>
        </a>
      </div>
    </div>
  );
}
