import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

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

  //Set userData equal to result of GET_ME query
  const userData = data?.me || {};
  // console.log(userData);

  // console.log(JSON.stringify(userData));
  

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    
    //Do nothing if the user isn't logged in
    if (!token) {
      return false;
    }
    
    try {
      //Remove the book and return the updated user
      const incomingData = await removeBook({ variables: { bookId: bookId } });
      console.log(incomingData);
      
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }

  };

  //Notify user if still waiting to load books
  if(loading) {
    return <h2>Your saved books are loading...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing {userData.username}'s books!</h1>
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
                  <Card.Link href={book.link}>Visit On GoogleBooks</Card.Link>
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
