import Container from 'components/Container';
import { useConfetti } from 'hooks/useConfetti';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import isValidEmail from 'utils/isValidEmail';
import ConfettiCanvas from './ConfettiCanvas';

export default function Subscribe() {
  const [formState, setFormState] = useState('initial');
  const { register, handleSubmit, reset } = useForm();
  const { getInstance, fire } = useConfetti();

  const onSubmit = async ({ email }) => {
    if (!email && !isValidEmail(email)) {
      return toast.error('Email is not valid');
    }

    setFormState('loading');
    const response = await fetch('/api/subscribe-convertkit', {
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
    <div className="py-24 text-center bg-gray-100">
      <Container>
        <div className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Subscribe to the newsletter
        </div>
        <div className="max-w-2xl mx-auto mt-4 text-lg text-gray-500">
          Get emails from me about web development, tech, and early access to new
          articles.
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 sm:mx-auto sm:max-w-lg sm:flex"
        >
          <div className="flex-1 min-w-0">
            <label htmlFor="cta-email" className="sr-only">
              Email address
            </label>

            <input
              {...register('email')}
              type="email"
              className="block w-full px-5 py-3 text-base text-gray-900 placeholder-gray-500 border border-transparent rounded-md shadow-sm"
              placeholder="Enter your email"
            />

            <ConfettiCanvas getInstance={getInstance} />

            <button
              type="submit"
              className="block w-full px-5 py-3 mt-4 text-base font-medium text-white transform bg-gray-600 border border-transparent rounded-md shadow hover:bg-gray-500 sm:px-10"
            >
              {formState === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
            {formState === 'success' && (
              <div
                onClick={fire}
                className="mt-2 text-sm font-semibold text-gray-500 cursor-pointer"
              >
                🎉 Give me more confetti
              </div>
            )}
          </div>
        </form>
      </Container>
    </div>
  );
}
