// 'use client';
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import AppleProvider from 'next-auth/providers/apple';
import { useMutation } from "@apollo/react-hooks";
import FacebookProvider from 'next-auth/providers/facebook';
import client from '@/config/applloClient';

//------------------------------------------------------------components
import AppleClientSecret from './appleClientSecret';
import { GOOGLE_SIGN_IN } from '../config/graphql';


async function RefreshAccessToken(token: string) {
    client.mutate({
        mutation: GOOGLE_SIGN_IN,
        variables: {
            token: token
        }
    }).then((res) => {
        console.log('sign innnnnnn : ', res.data.googleLogin.token);
        return res.data.googleLogin.token as string
    }).catch((err) => {
        return 'RefreshAccessTokenError'
    })
}


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
        async jwt({ token, account }) {
            if (account) {
                token.access_token = account.id_token
            }
            return token
        },
        async session({ session, token, user }) {
            session.user.token = token.access_token as string;
            let refreshToken;
            client.mutate({
                mutation: GOOGLE_SIGN_IN,
                variables: {
                    token: token.access_token as string
                }
            }).then((res) => {
                console.log('sign innnnnnn : ', res.data.googleLogin.token);
                refreshToken = res.data.googleLogin.token;
                session.user.refreshToken = refreshToken
                console.log('session : ', session.user.refreshToken);
                console.log('session : ', session);
            }).catch((err) => {
                console.log('refresh token error : ', err);
            })
            
            return session
        },
        async signIn({ user, account, profile, email, credentials }) {

            return true;
        }
    },
    events: {
        signIn: async ({ user, account, profile }) => {
            console.log(account);
        }
    }
};

function CredentialsProvider(arg0: { type: string; credentials: {}; authorize: (credentials: any, req: any) => Promise<{ id: any; token: any; } | null>; }): import("next-auth/providers").Provider {
    throw new Error('Function not implemented.');
}
