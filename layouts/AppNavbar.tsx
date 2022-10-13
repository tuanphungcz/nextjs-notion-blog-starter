import { SignInButton } from 'components/base/Button';
import Container from 'components/base/Container';
import Dropdown from 'components/Dropdown';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function AppNavbar() {
  const { data: session } = useSession();

  return (
    <div className="bg-white border-b">
      <Container small>
        <div className="flex items-center justify-between w-full py-4">
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <div className="text-xl font-bold ">Blogfolio.co</div>
              <div className="ml-2 block rounded-full bg-gray-700 px-1.5 py-0.5 text-xs font-semibold text-white ">
                Beta
              </div>
            </div>
          </Link>
          <div className="flex justify-center space-x-6 md:order-2">
            {session ? <Dropdown /> : <SignInButton />}
          </div>
        </div>
      </Container>
    </div>
  );
}
