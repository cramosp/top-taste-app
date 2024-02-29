import { API_URL } from '@/core/env';
import { API_ROUTES, APP_ROUTES } from '@/core/routes';
import { AuthUser } from '@/core/types';
import { NextAuthOptions, Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          // Login calling express api
          const res = await fetch(`${API_URL}${API_ROUTES.LOGIN}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          if (!res.ok) {
            return null;
          }

          // Return user fetched from api
          const data = await res.json();
          return {
            ...data.user,
            accessToken: data.authToken,
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      // This user constant only has value when we are loging in the user.
      if (user) {
        token.accessToken = (user as AuthUser).accessToken;
      }

      return token;
    },
    session: ({ token, session }) => {
      // return jwt in session to be accessible in client
      session.user = {
        ...session.user,
        accessToken: token.accessToken,
      } as Session['user'];

      return session;
    },
  },
  pages: {
    // Overwerite default signIn form page
    signIn: APP_ROUTES.LOGIN,
  },
};
