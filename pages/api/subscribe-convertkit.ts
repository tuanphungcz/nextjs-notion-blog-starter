import prisma from 'lib/prisma';
import { isValidEmail } from 'lib/utils';
import { getSession } from 'next-auth/react';

const subscribeConvertkit = async (req, res) => {
  const { email } = JSON.parse(req.body);

  if (!email) {
    return res.status(400).json({ error: 'Email is required.' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Email is invalid.' });
  }

  const session = await getSession({ req });

  const blog = await prisma.blogWebsite.findFirst({
    where: { email: session?.user.email },
    select: { convertkitApiKey: true, convertkitFormid: true }
  });

  try {
    const response = await fetch(
      `https://api.convertkit.com/v3/forms/${blog.convertkitFormid}/subscribe`,
      {
        body: JSON.stringify({ email, api_key: blog.convertkitApiKey }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST'
      }
    );

    // something went wrong on the convertkit server
    if (response.status >= 400) {
      return res
        .status(400)
        .json({ error: 'There was an error subscribing to the list.' });
    }

    // Success
    return res.status(201).json({ error: null });
  } catch (error) {
    return res.status(500).json({ error: error.message || error.toString() });
  }
};

export default subscribeConvertkit;
