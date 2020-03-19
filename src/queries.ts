import gql from 'graphql-tag';

export const NOTE_FRAGMENT = gql`
  fragment NoteParts on Note {
    id
    title
    content
  }
`;

export const GET_NOTES = gql`
  {
    notes @client {
      ...NoteParts
    }
  }
  ${NOTE_FRAGMENT}
`;

export const GET_NOTE = gql`
  query getNote($id: Int!) {
    note(id: $id) @client {
      ...NoteParts
    }
  }
  ${NOTE_FRAGMENT}
`;

export const EDIT_NOTE = gql`
  mutation editNote($id: Int!, $title: String!, $content: String!) {
    editNote(id: $id, title: $title, content: $content) @client {
      id
    }
  }
`;

export const CREATE_NOTE = gql`
  mutation createNote($title: String, $content: String) {
    createNote(title: $title, content: $content) @client {
      id
    }
  }
`;
