import { gql } from '@apollo/client';

//Query the user
export const GET_ME = gql`
    {
        me {
            _id
            username
            email
            bookCount
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
`;

//Get single user - for testing purposes only
export const GET_A_USER = gql`
    query getUser($username: String!) {
        getUser(username: $username) {
            _id
            username
            email
            savedBooks {
                authors
                bookId
                image
                link
                title
            }
        }
    }
`;