import { ApolloClient, InMemoryCache } from '@apollo/client';

const{ REACT_APP_API_URL } = process.env;

const client = new ApolloClient({
  uri: REACT_APP_API_URL,
  cache: new InMemoryCache()
});

export default client;