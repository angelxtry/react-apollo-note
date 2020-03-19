import gql from 'graphql-tag';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { NOTE_FRAGMENT } from './fragments';
import { GET_NOTES } from './queries';
import { saveNoteAtLocalStorage, loadNoteFromLocalStorage } from './offline';

export const defaults = {
  notes: [
    ...loadNoteFromLocalStorage()
  ],
};

// export const defaults = {
//   notes: loadNoteFromLocalStorage(),
// };

export const typeDefs = gql`
  type Note {
    id: Int!
    title: String!
    content: String!
  }
  type Query {
    notes: [Note]
    note(id: String!): Note
  }
  type Mutation {
    createNote(title: String!, content: String!): Note!
    editNote(id: Int!, title: String!, content: String!): Note
  }
`;

export const resolvers = {
  Query: {
    note: (
      _: undefined,
      { id }: { id: string},
      { cache }: { cache: InMemoryCache },
    ) => {
      const noteId = `Note:${id}`;
      const note = cache.readFragment({ fragment: NOTE_FRAGMENT, id: noteId });
      return note;
    },
  },
  Mutation: {
    createNote: (_: undefined, args: any, { cache }: any) => {
      console.log('createNote');
      console.log(args);
      const data = cache.readQuery({ query: GET_NOTES }) as any;
      console.log('createNote: ', data);
      const notes = [];
      if (data) {
        notes.push(...data.notes);
      }
      console.log('createNote - readQuery: ', notes);
      // console.log(exNotes);
      const newNote = {
        __typename: 'Note',
        title: args.title,
        content: args.content,
        id: notes.length + 1,
      };
      console.log(newNote);
      cache.writeData({
        data: {
          notes: [newNote, ...notes],
        },
      });
      saveNoteAtLocalStorage(cache);
      return newNote;
    },
    editNote: (
      _: undefined,
      { id, title, content }: { id: number; title: string; content: string },
      { cache }: { cache: InMemoryCache },
    ) => {
      const noteId = `NOTE:${id}`;
      const note = cache.readFragment({
        fragment: NOTE_FRAGMENT,
        id: noteId,
      }) as any[];
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
      saveNoteAtLocalStorage(cache);
      return updateNote;
    },
  },
};
