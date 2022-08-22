
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import App from './App';

const client = new ApolloClient({
    uri: 'http://localhost:5012/graphql',
    cache: new InMemoryCache(),
  });

export default (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)