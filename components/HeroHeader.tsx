import Container from './base/Container';
import SubscribeInput from './SubscribeInput';

export default function HeroHeader({ blog }: any) {
  const FORM_ID = blog.convertkitFormid;
  const API_KEY = blog.convertkitApiKey;

  return (
    <div className="py-16 text-center bg-gray-100">
      <Container>
        {blog?.profileUrl && (
          <img
            src={blog.profileUrl}
            className="w-24 h-24 mx-auto rounded-full"
            alt="profile"
          />
        )}
        <div className="mt-4 text-3xl font-extrabold text-gray-900">
          {blog?.headerTitle}
        </div>
        <div className="max-w-xl mx-auto mt-2 text-lg text-gray-500">
          {blog?.headerDescription}
        </div>

        {FORM_ID && API_KEY && (
          <div className="mt-6">
            <SubscribeInput />
          </div>
        )}
      </Container>
    </div>
  );
}
