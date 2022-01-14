import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: '/graphql'
});

const sampleToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoiY2FicmFsd2lsbGlhbXMiLCJlbWFpbCI6ImNhYnJhbC53aWxsaWFtc0BnbWFpbC5jb20iLCJfaWQiOiI2MWRmNzUyMGQ3ZWI2ZTg1Zjg5ODBiMGYifSwiaWF0IjoxNjQyMTEwNTcwLCJleHAiOjE2NDIxMTc3NzB9.5CmuGFD4iHt-OAJT_WRyRlodT2u8qLu-yC43MZIiFfM`;
//console.log(localStorage.getItem('id_token'));
const token1 = localStorage.getItem('id_token');
//console.log(token1);

const authLink = setContext((_, { headers }) => {
  console.log('setContext is running');
  const token = localStorage.getItem('id_token');
  console.log(token);
  //debugger
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

//Instantiate Apollo Client instance and create connection to endpoint above
//Next, instantiate new cache object
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path='/' component={SearchBooks} />
            <Route exact path='/saved' component={SavedBooks} />
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>
    
  );
}

export default App;
