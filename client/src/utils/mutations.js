import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation  loginUser($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
            token
            user {
                _id
                username
                email
                savedBooks {
                    authors
                    bookId
                    image
                    link
                    title
                    description
                }
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
                email
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($input: bookDetails!) {
        saveBook(input: $input) {
            authors
            bookId
            image
            link
            title
            description
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: String!) {
        removeBook(bookId: $bookId) {
            user {
                _id
                username
                savedBooks {
                    authors
                    bookId
                    image
                    link
                    title
                    description
                }
            }
        }
    }
`;