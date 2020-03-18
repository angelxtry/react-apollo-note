import gql from 'graphql-tag';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { NOTE_FRAGMENT } from './fragments';
import { GET_NOTES } from './queries';

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
  Query: {
    note: (_: undefined, args: any, { cache }: { cache: InMemoryCache }) => {
      const id = `Note:${args.id}`;
      const note = cache.readFragment({ fragment: NOTE_FRAGMENT, id });
      return note;
    },
  },
  Mutation: {
    createNote: (
      _: undefined,
      args: any,
      { cache }: { cache: InMemoryCache },
    ) => {
      const data = cache.readQuery({ query: GET_NOTES });
      const { notes } = data as { notes: any[] };
      const newNote = {
        __typename: 'Note',
        title: args.title,
        content: args.content,
        id: notes.length + 1,
      };
      cache.writeData({
        data: {
          notes: [newNote, ...notes],
        },
      });
      return newNote;
    },
    editNote: (
      _: undefined,
      { id, title, content }: { id: number; title: string; content: string },
      { cache }: { cache: InMemoryCache },
    ) => {
      const noteId = `Note:${id}`;
      const note = cache.readFragment({
        fragment: NOTE_FRAGMENT,
        id: noteId,
      }) as {
        id: number;
        title: string;
        content: string;
      };
      // console.log(note);
      const updateNote = {
        ...note,
        title,
        content,
      };
      cache.writeFragment({
        id: noteId,
        fragment: NOTE_FRAGMENT,
        data: updateNote,
      });
      return updateNote;
    },
  },
};
