import { useRouter } from 'next/router';
import SignIn from 'components/SignIn';
import AppNavbar from 'layouts/AppNavbar';
import Container from 'components/base/Container';

export default function Index() {
  return (
    <>
      <AppNavbar />
      <SignIn />
    </>
  );
}
