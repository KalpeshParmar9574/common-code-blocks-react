import { InMemoryCache, ApolloClient, ApolloClient } from "@apollo/client";

const ApolloClient = new ApolloClient({
    uri:'graphql uri',
    caches: InMemoryCache,
})
export default ApolloClient;