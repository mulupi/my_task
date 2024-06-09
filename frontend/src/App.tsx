import React from 'react';
import './App.css';
import LandingPage from './landing-page/LandingPage';
import { gql, useQuery } from '@apollo/client';

const GET_BOOKS = gql`
  query GetBooks {
  book(title:"Princess") {
    title,
    author
  }
}
`

function App() {
  const { loading, data } = useQuery(GET_BOOKS);
  if (loading) return (
    <div className="App">
      loading
    </div>
  )
  console.log(data)
  return (
    <div className="App">
      <LandingPage />
    </div>
  );
}

export default App;
