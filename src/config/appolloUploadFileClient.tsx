import {
    ApolloClient,
    InMemoryCache,
} from '@apollo/client';
import { createUploadLink } from "apollo-upload-client";
import { setContext } from '@apollo/client/link/context';

const httpLink = createUploadLink({
    uri: "https://devapi.wwai.ai/graphql",
});


const autLink = setContext(async (_, { header }) => {
    const user = await localStorage.getItem("user");

    return {
        headers: {
            ...header,
            "Authorization": user ? `Bearer ${JSON.parse(user)}` : ''
        }
    }
});


const uploadFileClient = new ApolloClient({
    link: autLink.concat(httpLink),
    cache: new InMemoryCache()
});

export default uploadFileClient;