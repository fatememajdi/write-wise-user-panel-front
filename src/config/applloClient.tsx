import {
    ApolloClient,
    InMemoryCache,
    createHttpLink
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


const httpLink = createHttpLink({
    uri: process.env.URI,
});

const autLink = setContext(async (_, { header }) => {
    const user = await localStorage.getItem("user");

    if (user)
        return {
            headers: {
                ...header,
                'Content-Type': 'application/json',
                "Authorization": user ? `Bearer ${user as string}` : '',
            }
        }
    else
        return {};
});


const client = new ApolloClient({
    link: autLink.concat(httpLink),
    cache: new InMemoryCache(),
});

const autLink2 = setContext(async (_, { header }) => {
    return {};
});


const loginClient = new ApolloClient({
    link: autLink2.concat(httpLink),
    cache: new InMemoryCache(),
});



export default client;
export { loginClient };