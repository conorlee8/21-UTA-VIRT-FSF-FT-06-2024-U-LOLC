import { useState } from 'react';
import { Container, Col, Form, Button, Card, Row } from 'react-bootstrap';
import { useMutation, useLazyQuery } from '@apollo/client';
import { SEARCH_BOOKS } from '../utils/queries';
import { SAVE_BOOK } from '../utils/mutations';
import * as Auth from '../utils/auth'; // Use named import for Auth functions
import { saveBookIds, getSavedBookIds } from '../utils/localStorage';

const SearchBooks = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());

  const [searchBooks] = useLazyQuery(SEARCH_BOOKS, {
    onCompleted: (data) => setSearchedBooks(data.searchBooks),
  });

  const [saveBook] = useMutation(SAVE_BOOK);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!searchInput) return;

    searchBooks({ variables: { query: searchInput } });
    setSearchInput('');
  };

  const handleSaveBook = async (bookId) => {
    const bookToSave = searchedBooks.find((book) => book.bookId === bookId);
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) return false;

    try {
      await saveBook({ variables: { bookData: bookToSave } });
      setSavedBookIds([...savedBookIds, bookToSave.bookId]);
      saveBookIds([...savedBookIds, bookToSave.bookId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Container className="text-light bg-dark p-5">
        <h1>Search for Books!</h1>
        <Form onSubmit={handleFormSubmit}>
          <Row>
            <Col xs={12} md={8}>
              <Form.Control
                name='searchInput'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                type='text'
                size='lg'
                placeholder='Search for a book'
              />
            </Col>
            <Col xs={12} md={4}>
              <Button type='submit' variant='success' size='lg'>
                Submit Search
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
      <Container>
        <h2 className="pt-5">
          {searchedBooks.length
            ? `Viewing ${searchedBooks.length} results:`
            : 'Search for a book to begin'}
        </h2>
        <Row>
          {searchedBooks.map((book) => (
            <Col md="4" key={book.bookId}>
              <Card border='dark'>
                {book.image ? (
                  <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className="small">Authors: {book.authors.join(', ')}</p>
                  <Card.Text>{book.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedBookIds?.some((savedBookId) => savedBookId === book.bookId)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveBook(book.bookId)}
                    >
                      {savedBookIds?.some((savedBookId) => savedBookId === book.bookId)
                        ? 'This book has already been saved!'
                        : 'Save this Book!'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default SearchBooks;