import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    movies: [Movie]
    movie(id: ID!): Movie
    directors: [Director] 
  }

  type Mutation {
    addMovie(title: String!, year: Int!, directorId: ID!): Movie
    addDirector(name: String!): Director
  }

  type Movie {
    id: ID!
    title: String!
    year: Int!
    director: Director!
  }

  type Director {
    id: ID!
    name: String!
  }
`;

export default typeDefs;
