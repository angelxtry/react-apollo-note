import React from 'react';
import { useParams, useHistory, RouteComponentProps } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Editor from '../../Components/Editor';
import { GET_NOTE } from '../../queries';

export const EDIT_NOTE = gql`
  mutation editNote($id: Int!, $title: String!, $content: String!) {
    editNote(id: $id, title: $title, content: $content) @client {
      id
    }
  }
`;

type Props = RouteComponentProps;

const Edit: React.FC<Props> = () => {
  const params = useParams() as { id: string};
  const { data } = useQuery(GET_NOTE, {
    variables: { id: params.id },
  });

  const history = useHistory();
  const [editNoteMutation] = useMutation(EDIT_NOTE);
  const mutationFn = async (
    title: string,
    content: string,
    id: number | null,
  ) => {
    if (title !== '' && content !== '' && id) {
      await editNoteMutation({ variables: { id, title, content } });
      history.push('/');
    }
  };

  return data?.note ? (
    <Editor
      exId={data.note.id}
      exTitle={data.note.title}
      exContent={data.note.content}
      onSave={mutationFn}
    />
  ) : (
    <div>Note not found</div>
  );
};

export default Edit;
