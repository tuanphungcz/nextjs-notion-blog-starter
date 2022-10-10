export default function Container({ children, small }: any) {
  return (
    <div className={`px-4 mx-auto md:px-8 ${small ? 'max-w-4xl' : 'max-w-6xl'}`}>
      {children}
    </div>
  );
}
