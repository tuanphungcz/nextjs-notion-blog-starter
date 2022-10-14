import { useConfetti } from 'hooks/useConfetti';
import { isValidEmail } from 'lib/utils';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { PrimaryButton } from './base/Button';
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
        className="grid items-center justify-center max-w-sm grid-flow-col gap-4 mx-auto"
      >
        <div className="w-full">
          <label htmlFor="cta-email" className="sr-only">
            Email address
          </label>

          <input
            {...register('email')}
            type="email"
            className="w-full px-3 py-2 text-sm text-gray-600 placeholder-gray-500 border rounded-lg"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <ConfettiCanvas getInstance={getInstance} />
          <PrimaryButton>
            {formState === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </PrimaryButton>
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
        <div className="mt-2 text-sm text-gray-500"></div>
      )}
    </>
  );
}
