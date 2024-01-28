// 'use client';
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import AppleProvider from 'next-auth/providers/apple';
import FacebookProvider from 'next-auth/providers/facebook';
import { loginClient } from '@/config/applloClient';

//------------------------------------------------------------components
import AppleClientSecret from './appleClientSecret';
import { GOOGLE_SIGN_IN, META_SIGN_IN } from '../config/graphql';

export const authConfig: NextAuthOptions = {

    providers: [
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
        signIn: '/signIn',
        // signOut: '/signIn?error=dfg',
        newUser: '/ielts',
        error: '/signIn',
    },
    callbacks: {
        async redirect({ url, baseUrl }) {
            return url
        },
        async jwt({ token, account, }) {
            if (account) {
                if (account.provider === 'google')
                    await loginClient.mutate({
                        mutation: GOOGLE_SIGN_IN,
                        variables: {
                            token: account.id_token as string
                        }
                    }).then((res) => {
                        token.access_token = res.data.googleLogin.token as string;
                        return token;
                    }).catch((err) => {
                        token.error = err.message as string
                        console.log('refresh token error : ', err);
                        CredentialsProvider(err.message)
                    });
                else if (account.provider === 'facebook') {
                    await loginClient.mutate({
                        mutation: META_SIGN_IN,
                        variables: {
                            token: account.access_token as string
                        }
                    }).then((res) => {
                        console.log(res.data.metaLogin.token as string)
                        token.access_token = res.data.metaLogin.token as string;
                        return token;
                    }).catch((err) => {
                        token.error = err.message as string
                        console.log('refresh token error : ', err);
                        CredentialsProvider(err.message)
                    });
                }
            }
            return token;
        },
        async session({ session, token, user }) {
            if (token.error) {
                session.error = token.error;
            } else
                session.user.token = token.access_token as string;
            return session
        },
        async signIn({ user, account, profile, email, credentials }) {
            return true;
        }
    },
    events: {
        signIn: async ({ user, account, profile }) => {

            // console.log(account);
        },
    }
};

function CredentialsProvider(err: string): import("next-auth/providers").Provider {
    throw new Error(err);
}