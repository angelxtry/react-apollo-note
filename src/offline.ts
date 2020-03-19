import { InMemoryCache } from 'apollo-cache-inmemory';
import { GET_NOTES } from './queries';
import { Note } from './types/graph';

const STORAGE_KEY_NAME = 'Notes' as const;

export const saveNoteAtLocalStorage = (cache: InMemoryCache) => {
  const data = cache.readQuery({ query: GET_NOTES });
  const jsonNotes = JSON.stringify(data);
  try {
    localStorage.setItem(STORAGE_KEY_NAME, jsonNotes);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

export const loadNoteFromLocalStorage = (): Note[] => {
  const notes = localStorage.getItem(STORAGE_KEY_NAME);
  if (notes) {
    try {
      const parsedNotes = JSON.parse(notes) as { notes: Note[] };
      return parsedNotes.notes;
    } catch (error) {
      return [];
    }
  }
  return [];
};
