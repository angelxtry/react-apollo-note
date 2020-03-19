import { InMemoryCache } from 'apollo-cache-inmemory';
import { GET_NOTES } from './queries';
import { NoteRespose } from './types/types';
import { Note } from './types/graph';

export const saveNoteAtLocalStorage = (cache: InMemoryCache) => {
  const data = cache.readQuery<NoteRespose>({ query: GET_NOTES });
  const jsonNotes = JSON.stringify(data);
  try {
    localStorage.setItem('Notes', jsonNotes);
  } catch (error) {
    console.log(error);
  }
};

export const loadNoteFromLocalStorage = (): Note[] => {
  const notes = localStorage.getItem('Notes');
  if (notes) {
    try {
      const parsedNotes = JSON.parse(notes) as Note[];
      return parsedNotes;
    } catch (error) {
      return [];
    }
  }
  return [];
};
