import gql from 'graphql-tag';

export const NOTE_FRAGMENT = gql`
  fragment NotePart on Note {
    id
    title
    content
  }
`;
