import {
    ApolloClient,
    InMemoryCache,
    createHttpLink
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


const httpLink = createHttpLink({
    uri: "https://api.wwai.ai/graphql",
});

// const autLink = setContext(async (_, { header }) => {

//     return {
//         headers: {
//             ...header,
//             "Authorization": user ? `Bearer ${JSON.parse(user)}` : ''
//         }
//     }
// });


const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
})



export default client;