import Container from 'components/base/Container';
import HeroLanding from 'components/HeroLanding';
import AppNavbar from 'layouts/AppNavbar';

export default function Index() {
  return (
    <>
      <AppNavbar />
      <Container small>
        <HeroLanding />
      </Container>
    </>
  );
}
