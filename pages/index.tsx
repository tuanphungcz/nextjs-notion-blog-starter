import HeroLanding from 'components/HeroLanding';
import AppNavbar from 'layouts/AppNavbar';

export default function Index() {
  return (
    <div className="pb-24 bg-gray-100 ">
      <div className="pb-24 max-w-5xl px-4 mx-auto bg-white sm:px-16 md:px-24">
        <AppNavbar />
        <HeroLanding />
      </div>
    </div>
  );
}
