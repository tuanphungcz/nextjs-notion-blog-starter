import Container from './base/Container';
import SubscribeInput from './SubscribeInput';

export default function HeroHeader({ blog }: any) {
  const site = blog.settingData?.site;

  const formId = site?.convertkitFormid;
  const apiKey = site?.convertkitApiKey;

  return (
    <div className="py-16 text-center bg-gray-100">
      <Container>
        {site?.profileUrl && (
          <img
            src={site?.profileUrl}
            className="w-24 h-24 mx-auto rounded-full"
            alt="profile"
          />
        )}
        <div className="mt-4 text-3xl font-extrabold text-gray-900">
          {site?.headerTitle}
        </div>
        <div className="max-w-xl mx-auto mt-2 text-lg text-gray-500">
          {site?.headerDescription}
        </div>

        {formId && apiKey && (
          <div className="mt-6">
            <SubscribeInput />
          </div>
        )}
      </Container>
    </div>
  );
}
