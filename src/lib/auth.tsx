// 'use client';
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import AppleProvider from 'next-auth/providers/apple';
import { useMutation } from "@apollo/react-hooks";
import FacebookProvider from 'next-auth/providers/facebook';

//------------------------------------------------------------components
import AppleClientSecret from './appleClientSecret';
import { GOOGLE_SIGN_IN } from '../config/graphql';

export const authConfig: NextAuthOptions = {

    providers: [
        // Credential({

        // }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID as string,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
        }),
        AppleProvider({
            clientId: process.env.APPLE_CLIENT_ID as string,
            clientSecret: AppleClientSecret()
        })],
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/dashboard',
        signOut: '/signIn'
    },
    callbacks: {
        async redirect() {
            return 'http://localhost:3000/dashboard'
        },
        async jwt({ token, account }) {
            // Persist the OAuth access_token to the token right after signin

            if (account) {
                token.access_token = account.id_token
            }
            // console.log('account  : ', account);
            // await fetch()s
            return token
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.
            session.user.token = token.access_token as string;
            // console.log('token in session : ', session);
            return session
        },
        async signIn({ user, account, profile, email, credentials }) {

            return true;
        }
    },
    events: {
        signIn: async ({ user, account, profile }) => {
            // const [googleSignIn, { error, loading }] = useMutation(GOOGLE_SIGN_IN);

            // await googleSignIn({
            //     variables: {
            //         token: account?.id_token as string,
            //     },
            // }).then(
            //     (data) => {
            //         console.log('goole login token : ', data);
            //     }
            // ).catch((error) => {
            //     console.log('google sign in error : ', error);
            // });
            console.log(account);
        }
    }
};

function CredentialsProvider(arg0: { type: string; credentials: {}; authorize: (credentials: any, req: any) => Promise<{ id: any; token: any; } | null>; }): import("next-auth/providers").Provider {
    throw new Error('Function not implemented.');
}
