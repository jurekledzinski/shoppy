import Credentials from 'next-auth/providers/credentials';
import NextAuth, { NextAuthConfig } from 'next-auth';

export const BASEPATH = '/api/auth';

const nextAuthOptions: NextAuthConfig = {
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize({ email, password }) {
        try {
          const res = await fetch('http://localhost:3000/api/v1/login', {
            body: JSON.stringify({ email, password }),
            method: 'POST',
            cache: 'no-store',
            headers: { 'Content-Type': 'application/json' },
          });

          if (!res.ok) {
            throw new Error(res.statusText);
          }

          const data = await res.json();

          return data.payload;
        } catch {
          return null;
        }
      },
    }),
  ],
  basePath: BASEPATH,
  secret: process.env.AUTH_SECRET,
  session: {
    maxAge: 30 * 60,
    updateAge: 15 * 60,
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      const tokenId = token.id as string;
      session.user.id = tokenId;
      return session;
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(nextAuthOptions);
