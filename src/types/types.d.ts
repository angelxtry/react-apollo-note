import { Note } from './graph';

export interface Notes {
  notes: Note[];
}

export interface NoteResponse {
  note: Note;
}

export interface Params {
  id: string;
}
