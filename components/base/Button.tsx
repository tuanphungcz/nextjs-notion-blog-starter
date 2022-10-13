import classNames from 'classnames';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const commonButtonProps =
  'inline-flex items-center px-4 py-2 text-sm space-x-2 font-medium transition rounded-lg shadow-sm cursor-pointer font-medium relative';

export const PrimaryButton = ({ children, ...other }) => {
  return (
    <div
      {...other}
      className={classNames(
        'text-white  bg-gray-900 border border-gray-300  hover:opacity-90',
        commonButtonProps
      )}
    >
      {children}
    </div>
  );
};

export const SecondaryButton = ({ children, ...other }) => {
  return (
    <div
      {...other}
      className={classNames(
        ' text-gray-700  bg-white border border-gray-300 hover:bg-gray-50 hover:opacity-90',
        commonButtonProps
      )}
    >
      {children}
    </div>
  );
};

export const SignInButton = () => {
  const { data: session } = useSession();
  const { push } = useRouter();

  return (
    <PrimaryButton
      onClick={e => {
        e.preventDefault();
        !session?.user
          ? signIn('google', { callbackUrl: '/my-blogs' })
          : push('/my-blogs');
      }}
    >
      {session?.user ? (
        <div>My blogs</div>
      ) : (
        <div className="flex items-center space-x-2">
          <div className="p-1 bg-white rounded-xl">
            <img src="/google.svg" className="w-4 h-4" />
          </div>
          <div>Get started</div>
        </div>
      )}
    </PrimaryButton>
  );
};
