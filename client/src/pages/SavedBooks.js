import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import { getMe, deleteBook } from '../utils/API';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';

const SavedBooks = () => {
  //const [userData, setUserData] = useState({});
  const { data, loading } = useQuery(GET_ME);

  //Create the useMutation handler
  const [removeBook, { error }] = useMutation(REMOVE_BOOK);

  //const { data, loading } = useQuery(GET_ME);
  const userData = data?.me || {};
  console.log(userData);

  //setUserData(meData);
  console.log(JSON.stringify(userData));
  

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    console.log(bookId);
    console.log(token);

    if (!token) {
      return false;
    }
    
    try {
      //const response = await deleteBook(bookId, token);
      //replace deleteBook with useMutation function
      // console.log(bookId);
      // const updatedUser = await removeBook({
      //   variables: { bookId: bookId }
      // });

      // console.log(updatedUser);
      const incomingData = await removeBook({ variables: { bookId: bookId } });

      // if (!response.ok) {
      //   throw new Error('something went wrong!');
      // }
      // if(!updatedUser) {
      //   console.log('There was a problem, chief.');
      //   throw new Error('Something malfunctioned.');
      // }

      // const updatedUser = await response.json();
      //userData = { ...updatedUser };
      // upon success, remove book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }

    // if data isn't here yet, say so
    // if (!userDataLength) {
    //   return <h2>LOADING...</h2>;
    // }
    
  };

  if(loading) {
    return <h2>Your saved books are loading...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {userData.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
}




export default SavedBooks;
