import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { BASE_URL } from '@/app/configs/base.config';
const secret = process.env.NEXTAUTH_SECRET;

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60, // 1 Day
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {},
            async authorize(credentials, req) {
                const response = await fetch(`${BASE_URL}/auth/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(credentials),
                })
                    .then((res) => {
                        return res.json();
                    })
                    .catch((error) => {
                        return null;
                    });
                if (response.access_token) {
                    return { id: response.access_token }
                } else {
                    return null
                }
            },
        })
    ],
    callbacks: {
        jwt: async ({ token }) => {
            return Promise.resolve(token);
        },
        session: async ({ session, token, user }: any) => {
            session.user = token.sub
            return Promise.resolve(session)
        },

        signIn: (params) => {
            return true
        }
    },
    secret,
    pages: {
        signIn: "/",
        signOut: "/",
        error: "/",
      },

}