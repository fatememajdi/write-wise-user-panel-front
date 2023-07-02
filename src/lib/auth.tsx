import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import AppleProvider from 'next-auth/providers/apple';
import FacebookProvider from 'next-auth/providers/facebook';
import { sign } from 'jsonwebtoken';
// import fs from 'fs';

// const getClientSecret = () => {
//     // sign with RSA SHA256
//     const privateKey = fs.readFileSync('/AuthKey_XC4B5VQ58G.p8');

//     let token: string = sign(
//         {
//             iss: process.env.APPLE_TEAM_ID as string,
//             iat: Math.floor(Date.now() / 1000),
//             exp: Math.floor(Date.now() / 1000) + (86400 * 180), // 6 months
//             aud: 'https://appleid.apple.com',
//             sub: process.env.APPLE_CLIENT_ID as string,
//         }, privateKey,
//         {
//             algorithm: 'ES256',
//             header: {
//                 alg: 'ES256',
//                 kid: process.env.APPLE_KEY_ID as string,
//                 typ: undefined as unknown as string,
//             }
//         }
//     );
//     console.log('token', token);
//     return token
// }

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
            clientSecret: 'eyJhbGciOiJFUzI1NiIsImtpZCI6IkxRRzhCNlZOTjIifQ.eyJleHAiOjE3MDM4NDc1OTEsImlhdCI6MTY4ODI5NTU5MSwiaXNzIjoiVzUyWVlBQ0haVCIsImF1ZCI6Imh0dHBzOi8vYXBwbGVpZC5hcHBsZS5jb20iLCJzdWIiOiJjb20ud3JpdGVXaXNlQWkud2ViLnNpZCJ9.r3UUzV6tyJJ4E9A1V_H8MT0_rvQLLvT9d_J4iCFW-mndNQOeHkWUum3l6bkrw6QiLRTmibi5d6iunYVEL8m_1Q'
        })],
};