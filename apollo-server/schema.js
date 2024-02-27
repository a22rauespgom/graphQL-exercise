// schema.js
import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    books: [Book]
    book(id: ID!): Book
    authors: [Author] 
  }

  type Mutation {
    addBook(title: String!, authorId: ID!): Book
    addAuthor(name: String!): Author
  }

  type Book {
    id: ID!
    title: String!
    author: Author!
  }

  type Author {
    id: ID!
    name: String!
  }
`;

export default typeDefs;
