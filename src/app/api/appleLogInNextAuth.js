import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const providers = [
    Providers.Apple({
        clientId: process.env.APPLE_ID,
        clientSecret: {
            appleId: process.env.APPLE_ID,
            teamId: process.env.APPLE_TEAM_ID,
            privateKey: process.env.APPLE_PRIVATE_KEY,
            keyId: process.env.APPLE_KEY_ID
        }
    })
];

const callbacks = {};

callbacks.session = async (session, user, sessionToken) => {
    return Promise.resolve({ ...session, ...user, ...sessionToken });
};

const options = {
    providers,
    session: {
        jwt: true
    },
    jwt: {
        secret: process.env.JWT_SECRET
    },
    callbacks
};

export default (req, res) => NextAuth(req, res, options);