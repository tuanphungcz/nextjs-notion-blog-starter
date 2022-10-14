import classNames from 'classnames';

export default function TagItem({ children, isSelected, ...other }) {
  return (
    <div
      {...other}
      className={classNames(
        isSelected && 'ring-2 ring-gray-400 text-gray-500',
        'text-gray-600 inline-flex items-center text-xs capitalize px-3 select-none py-1  bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 font-medium outline-none'
      )}
    >
      {children}
    </div>
  );
}
