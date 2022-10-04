import classNames from 'classnames';

export default function Card(props: any) {
  return (
    <div
      {...props}
      className={classNames(' bg-white rounded-lg border border-gray-200 ')}
    />
  );
}
