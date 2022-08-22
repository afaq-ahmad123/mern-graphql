import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import 'semantic-ui-css/semantic.min.css'
import './index.css';

import reportWebVitals from './reportWebVitals';
import App from './App';


const client = new ApolloClient({
    uri: 'http://localhost:5012/graphql',
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
