import Container from 'components/base/Container';
import Socials from 'components/Socials';
import Link from 'next/link';

export default function Footer({ blog }) {
  const site = blog.settingData?.site;

  return (
    <footer className="py-16 bg-white border-t">
      <Container>
        <div className="space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
          <p className="text-base text-center text-gray-400 ">{site?.footerText}</p>
          <div className="flex justify-center space-x-4 text-gray-400">
            {blog.settingData?.links.map(link => (
              <Link href={link?.url} key={link?.url}>
                <div className="cursor-pointer hover:underline">{link?.name}</div>
              </Link>
            ))}
          </div>
          <div className="">
            <Socials blog={blog} />
          </div>
        </div>
      </Container>
    </footer>
  );
}
