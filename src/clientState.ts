import gql from 'graphql-tag';

export const defaults = {
  notes: [
    {
      __typename: 'Note',
      id: 1,
      title: 'First',
      content: 'Second',
    },
  ],
};

export const typeDefs = gql`
  type Note {
    id: Int!
    title: String!
    content: String!
  }
  type Query {
    notes: [Note]!
    note(id: String!): Note
  }
  type Mutation {
    createNote(title: String!, content: String!): Note
    editNote(id: Int!, title: String!, content: String!): Note
  }
`;

export const resolvers = {
};
