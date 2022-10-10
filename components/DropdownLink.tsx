import Link from 'next/link';
import { forwardRef } from 'react';

const MyLink: any = forwardRef((props, ref) => {
  const { href, children, ...rest }: any = props;
  return (
    <Link href={href}>
      <a ref={ref} {...rest}>
        {children}
      </a>
    </Link>
  );
});

MyLink.displayName = 'MyLink';

export default MyLink;
