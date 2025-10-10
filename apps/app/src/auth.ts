import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { signIn as signInAction } from '@orchestrator/shared';
import type { AuthResponse } from '@orchestrator/shared/graphql';

declare module 'next-auth' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/no-empty-object-type
  interface Session extends AuthResponse {}
  interface User {
    token?: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: '/sign-in',
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  jwt: {
    maxAge: parseInt(process.env.JWT_EXPIRATION || '3600', 10),
  },
  providers: [
    Credentials({
      credentials: {
        name: {
          type: 'text',
          label: 'Name',
          placeholder: 'Username',
        },
        password: {
          type: 'password',
          label: 'Password',
          placeholder: '••••••••',
        },
      },
      authorize: async ({ name, password }) => {
        const response = await signInAction({ name, password } as any);

        if (!response?.access_token || !response?.user) {
          throw new Error('Invalid credentials');
        }

        return { token: response.access_token, ...response.user };
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl)
        ? Promise.resolve(url)
        : Promise.resolve(baseUrl);
    },
    async jwt({ token, user, account }) {
      if (user && account) {
        return { ...token, data: user };
      }

      return token;
    },
    async session({ session, token, user }) {
      // TODO - fixme
      session.user = token.data as any;

      return session;
    },
  },
});
