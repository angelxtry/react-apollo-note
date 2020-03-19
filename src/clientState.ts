import gql from 'graphql-tag';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Resolvers } from 'apollo-client';
import { NOTE_FRAGMENT } from './fragments';
import { GET_NOTES } from './queries';
import { saveNoteAtLocalStorage, loadNoteFromLocalStorage } from './offline';
import { Note } from './types/graph';
import { Notes } from './types/types';

const TYPE_NAME = 'Note' as const;

export const defaults = {
  notes: loadNoteFromLocalStorage(),
};

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

export const resolvers: Resolvers = {
  Query: {
    note: (
      _: undefined,
      { id }: { id: string },
      { cache }: { cache: InMemoryCache },
    ) => {
      try {
        const noteId = `${TYPE_NAME}:${id}`;
        const note = cache.readFragment<Note, string>({
          fragment: NOTE_FRAGMENT,
          id: noteId,
        });
        return note;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        return null;
      }
    },
  },
  Mutation: {
    createNote: (
      _: undefined,
      args: Note,
      { cache }: { cache: InMemoryCache },
    ) => {
      try {
        const data = cache.readQuery<Notes>({ query: GET_NOTES });
        const notes: Note[] = [];
        if (data) {
          notes.push(...data.notes);
        }
        const newNote = {
          __typename: TYPE_NAME,
          title: args.title,
          content: args.content,
          id: notes.length + 1,
        };
        cache.writeData({
          data: {
            notes: [newNote, ...notes],
          },
        });
        saveNoteAtLocalStorage(cache);
        return newNote;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        return null;
      }
    },
    editNote: (
      _: undefined,
      { id, title, content }: Note,
      { cache }: { cache: InMemoryCache },
    ) => {
      try {
        const noteId = `${TYPE_NAME}:${id}`;
        const note = cache.readFragment<Note, string>({
          fragment: NOTE_FRAGMENT,
          id: noteId,
        });
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
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        return null;
      }
    },
  },
};
