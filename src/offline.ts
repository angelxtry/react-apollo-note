import { InMemoryCache } from 'apollo-cache-inmemory';
import { GET_NOTES } from './queries';

export const saveNoteAtLocalStorage = (cache: InMemoryCache) => {
  const data = cache.readQuery({ query: GET_NOTES });
  const jsonNotes = JSON.stringify(data);
  try {
    localStorage.setItem('Notes', jsonNotes);
  } catch (error) {
    console.log(error);
  }
};

export const loadNoteFromLocalStorage = (): any[] => {
  const notes = localStorage.getItem('Notes');
  console.log(notes);
  if (notes) {
    try {
      const parsedNotes = JSON.parse(notes);
      console.log(parsedNotes.notes);
      return parsedNotes.notes;
    } catch (error) {
      return [];
    }
  }
  return [];
};
