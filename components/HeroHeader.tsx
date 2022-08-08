import Image from 'next/image';
import siteData from 'data/siteData';

export default function HeroHeader() {
  return (
    <div className="py-16 text-center bg-gray-100">
      {siteData?.profileUrl && (
        <Image
          src={siteData.profileUrl}
          className="mx-auto rounded-full"
          width={96}
          height={96}
          alt="profile"
        />
      )}
      <div className="mt-4 text-3xl font-extrabold text-gray-900">
        {siteData.headerTitle}
      </div>
      <div className="max-w-2xl mx-auto mt-2 text-xl text-gray-500">
        {siteData.headerDescription}
      </div>
    </div>
  );
}
