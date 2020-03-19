import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useHistory, RouteComponentProps } from 'react-router-dom';
import Editor from '../../Components/Editor';
import { CREATE_NOTE } from '../../queries';
import { Note, MutationCreateNoteArgs } from '../../types/graph';

type Props = RouteComponentProps;

const Add: React.FC<Props> = () => {
  const history = useHistory();
  const [createNoteMutation] = useMutation<Note, MutationCreateNoteArgs>(
    CREATE_NOTE,
  );
  const mutationFn = async (title: string, content: string) => {
    if (title !== '' && content !== '') {
      await createNoteMutation({ variables: { title, content } });
      history.push('/');
    }
  };

  return <Editor onSave={mutationFn} />;
};

export default Add;
