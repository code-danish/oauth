import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { signInEventHandler, signOutHandler } from './sessionEventHandler';

let clientId = process.env.GOOGLE_ID || '';
let clientSecret = process.env.GOOGLE_SECRET || '';
export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: clientId,
      clientSecret: clientSecret,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.SECRET || 'Uc71nK41BIagPbiJF7tOdmphnYxaByj5a+4+fx9CYv0=',
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log(user.email || 'email N/A ', 'signed in');
      signInEventHandler(user);
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, user, token }) {
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token;
    },
  },
  events: {
    async signOut({ token }) {
      console.log(token.email || 'email N/A ', 'signed out');
      signOutHandler({ email: token.email, name: token.name });
    },
  },
};

export default NextAuth(authOptions);
