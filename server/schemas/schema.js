const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    bookId: ID!
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type User {
    _id: ID!
    username: String
    email: String
    savedBooks: [Book]
  }

  type Query {
    me: User
    searchBooks(queryTerm: String!): [Book]
  }

  type Mutation {
    saveBook(bookId: ID!): User
    removeBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;
