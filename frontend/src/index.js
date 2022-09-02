import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import 'semantic-ui-css/semantic.min.css'
import './index.css';

import reportWebVitals from './reportWebVitals';
import App from './App';

const httpLink = createHttpLink({
    uri: 'http://127.0.0.1:5000/graphql'
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        }
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
