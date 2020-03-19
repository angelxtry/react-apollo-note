import gql from 'graphql-tag';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Resolvers } from 'apollo-client';
import { NOTE_FRAGMENT } from './fragments';
import { GET_NOTES } from './queries';
import { saveNoteAtLocalStorage, loadNoteFromLocalStorage } from './offline';
import { Note } from './types/graph';
import { NotesRespose } from './types/types';

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
    notes: [Note]!
    note(id: String!): Note!
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
      { id }: { id: number },
      { cache }: { cache: InMemoryCache },
    ) => {
      const noteId = `Note:${id}`;
      const note = cache.readFragment({ fragment: NOTE_FRAGMENT, id: noteId });
      return note;
    },
  },
  Mutation: {
    createNote: (
      _: undefined,
      { note }: { note: Note },
      { cache }: { cache: InMemoryCache },
    ) => {
      const data = cache.readQuery<NotesRespose>({ query: GET_NOTES }) || {
        notes: [],
      };
      const { notes: exNotes } = data;
      const newNote = {
        __typename: 'Note',
        title: note.title,
        content: note.content,
        id: exNotes.length + 1,
      };
      cache.writeData({
        data: {
          notes: [newNote, ...exNotes],
        },
      });
      saveNoteAtLocalStorage(cache);
      return newNote;
    },
    editNote: (
      _: undefined,
      { id, title, content }: Note,
      { cache }: { cache: InMemoryCache },
    ) => {
      const noteId = `Note:${id}`;
      const note = cache.readFragment<Note>({
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
    },
  },
};
