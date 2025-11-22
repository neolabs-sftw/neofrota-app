import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
  uri: "https://neofrotaapitemp-1.onrender.com/graphql",
    // uri: "http://192.168.1.6:4000/graphql",
    // uri: "http://192.168.100.78:4000/graphql",
    // uri:"https://neofrotaservico.onrender.com/graphql"
  }),
  cache: new InMemoryCache(),
});

export default client;
