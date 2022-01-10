//import the gql tagged template function
import { gql } from 'apollo-server-express';

//saveBook cannot take Book schema as an input - this necessitates the BookDetails input or listing all of the parameters individually

//Create typeDefs
const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        savedBooks: [Book]
    }

    type Book {
        authors: [String]
        bookId: String
        image: String
        link: String
        title: String
    }

    input BookDetails {
        authors: [String]
        bookId: String
        image: String
        link: String
        title: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
    }

    type Mutation {
        addUser(email: String!, password: String!, username: String!): Auth
        login(email: String!, password: String!): Auth
        saveBook(bookDetails: BookDetails!): User
        removeBook(bookId: String!): User
    }
`;

module.exports = typeDefs;