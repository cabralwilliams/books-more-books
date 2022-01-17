//import the gql tagged template function
const { gql } = require('apollo-server-express');

//saveBook cannot take Book schema as an input - this necessitates the BookDetails input or listing all of the parameters individually
//Could not get book input type to work properly - used individual parameters instead

//Create typeDefs
const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        authors: [String]
        bookId: String
        image: String
        link: String
        title: String
        description: String
    }

    input BookDetails {
        authors: [String]
        bookId: String
        image: String
        link: String
        title: String
        description: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        loginUser(email: String!, password: String!): Auth
        saveBook(authors: [String]!, bookId: String!, image: String!, link: String!, title: String!, description: String!): User
        removeBook(bookId: String!): User
    }
`;

module.exports = typeDefs;