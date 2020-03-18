import gql from 'graphql-tag';
import { NOTE_FRAGMENT } from './fragments';

export const GET_NOTES = gql`
  {
    notes @client {
      ...NotePart
    }
  }
  ${NOTE_FRAGMENT}
`;

export const GET_NOTE = gql`
  query getNote($id: Int!) {
    note(id: $id) @client {
      ...NotePart
    }
  }
  ${NOTE_FRAGMENT}
`;

