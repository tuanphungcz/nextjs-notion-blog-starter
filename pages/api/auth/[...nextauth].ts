import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from 'utils/prisma';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string
    })
  ],
  theme: {
    colorScheme: 'light'
  },
  callbacks: {
    async jwt({ token }: any) {
      token.userRole = 'admin';
      return token;
    }
  }
};

export default NextAuth(authOptions);
