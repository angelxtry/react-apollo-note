import gql from 'graphql-tag';

export const defaults = {};

export const typeDefs = gql`
  type Query {
    ping: String!
  }
`;

export const resolvers = {
  Query: {
    pong: () => 'ping',
  },
};
