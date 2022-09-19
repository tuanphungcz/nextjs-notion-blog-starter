import { useConfetti } from 'hooks/useConfetti';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import isValidEmail from 'utils/isValidEmail';
import ConfettiCanvas from './ConfettiCanvas';

const CONVERTKIT_API = '/api/subscribe-convertkit';

export default function SubscribeInput() {
  const [formState, setFormState] = useState('initial');
  const { register, handleSubmit, reset } = useForm();
  const { getInstance, fire } = useConfetti();

  const onSubmit = async ({ email }) => {
    if (!email && !isValidEmail(email)) {
      return toast.error('Email is not valid');
    }

    setFormState('loading');
    const response = await fetch(CONVERTKIT_API, {
      method: 'POST',
      body: JSON.stringify({ email })
    });

    const { error } = await response.json();

    if (error) {
      toast.error(error);
      return setFormState('error');
    }

    reset();
    fire();
    toast.success('Check your email to confirm your subscription');
    return setFormState('success');
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid items-center max-w-md grid-flow-row gap-4 mx-auto mt-8 sm:grid-flow-col"
      >
        <div className="w-full">
          <label htmlFor="cta-email" className="sr-only">
            Email address
          </label>

          <input
            {...register('email')}
            type="email"
            className="w-full px-5 py-3 text-base text-gray-900 placeholder-gray-500 border border-transparent rounded-md shadow-sm"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <ConfettiCanvas getInstance={getInstance} />
          <button
            type="submit"
            className="block w-full px-2 py-3 font-medium text-white transform bg-gray-600 border border-transparent rounded-md shadow hover:bg-gray-500 sm:px-6"
          >
            {formState === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </div>
      </form>
      {formState === 'success' ? (
        <div
          onClick={fire}
          className="mt-2 text-sm font-semibold text-gray-500 cursor-pointer"
        >
          🎉 Give me more confetti
        </div>
      ) : (
        <div className="mt-2 text-sm text-gray-500">
          Be the first to know when the blog is published
        </div>
      )}
    </>
  );
}
