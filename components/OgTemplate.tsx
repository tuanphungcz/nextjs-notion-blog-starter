export default function OgTemplate({ date, title }) {
  return (
    <div className="w-[1200px] h-[630px] border flex items-center justify-center p-16">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="text-2xl">
          <div className="">{date}</div>
        </div>
        <div className="mt-4 mb-8 font-extrabold text-7xl leading-[80px] text-center">
          {title}
        </div>
      </div>
    </div>
  );
}
