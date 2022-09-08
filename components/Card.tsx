import classNames from 'classnames';

export default function Card(props: any) {
  return (
    <div
      {...props}
      className={classNames('p-4 bg-white rounded sm:p-6 shadow', props.customClassname)}
    />
  );
}
