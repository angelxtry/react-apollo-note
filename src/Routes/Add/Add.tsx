import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useHistory, RouteComponentProps } from 'react-router-dom';
import gql from 'graphql-tag';
import Editor from '../../Components/Editor';

export const CREATE_NOTE = gql`
  mutation createNote($title: String, $content: String) {
    createNote(title: $title, content: $content) @client {
      id
    }
  }
`;

type Props = RouteComponentProps;

const Add: React.FC<Props> = () => {
  const history = useHistory();
  const [createNoteMutation] = useMutation(CREATE_NOTE);
  const mutationFn = async (title: string, content: string) => {
    if (title !== '' && content !== '') {
      console.log('Add: ', title, content);
      await createNoteMutation({ variables: { title, content } });
      history.push('/');
    }
  };

  return <Editor onSave={mutationFn} />;
};

export default Add;
