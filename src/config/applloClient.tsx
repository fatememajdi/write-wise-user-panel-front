import {
    ApolloClient,
    InMemoryCache,
    createHttpLink
} from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';


const httpLink = createHttpLink({
    // uri: "http://5.161.207.215:3000/graphql",
    uri: "https://ielts.api.babyyodas.io/graphql",
});

// const autLink = setContext((_, { header }) => {
//     return {
//         headers: {
//             // token: localStorage.getItem("token"),
//             'Access-Control-Allow-Origin': "*"
//         }
//     }
// });

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
})

export default client;