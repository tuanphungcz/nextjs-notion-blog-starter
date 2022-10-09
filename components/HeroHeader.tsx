import Container from './base/Container';
import Socials from './Socials';
import SubscribeInput from './SubscribeInput';

export default function HeroHeader({ blog }: any) {
  const site = blog.settingData?.site;

  const formId = site?.convertkitFormid;
  const apiKey = site?.convertkitApiKey;

  return (
    <div className="pt-24 pb-16 bg-gray-100">
      <Container>
        {/* <div className="max-w-2xl">
          <h1 className="text-4xl font-bold text-zinc-800 sm:text-5xl sm:leading-[48px]">
            {site?.headerTitle}
          </h1>
          <p className="mt-6 text-base leading-8 text-zinc-600">
            {site?.headerDescription}
          </p>
          <div className="mt-4">
            <Socials blog={blog} />
          </div>
        </div> */}
        {site?.profileUrl && (
          <img
            src={site?.profileUrl}
            className="w-24 h-24 mx-auto text-center rounded-full"
            alt="profile"
          />
        )}
        <div className="mt-4 text-3xl font-extrabold text-center text-gray-900">
          {site?.headerTitle}
        </div>
        <div className="max-w-xl mx-auto mt-2 text-lg text-center text-gray-500">
          {site?.headerDescription}
        </div>

        {formId && apiKey ? (
          <div className="mt-6">
            <SubscribeInput />
          </div>
        ) : (
          <div className="flex justify-center mt-4">
            <Socials blog={blog} />
          </div>
        )}
      </Container>
    </div>
  );
}
