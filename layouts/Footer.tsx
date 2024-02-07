import Container from 'components/Container';
import Socials from 'components/Socials';

export default function Footer({ blog }) {
  return (
    <footer className="py-16 bg-white border-t">
      <Container>
        <div className="md:flex md:items-center md:justify-between">
          <Socials />
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-base text-center text-gray-400">{blog?.footerText}</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
