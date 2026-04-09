import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://neofrota-api.vercel.app/graphql",
    // uri: "https://neofrotaapi.vercel.app/graphql",
    // uri: "http://192.168.1.3:4000/graphql",
    // uri: "http://172.20.10.3:4000/graphql",
    // uri: "http://192.168.100.78:4000/graphql",
  }),
  cache: new InMemoryCache(),
});

export default client;
