import React from 'react';
import { useParams, useHistory, RouteComponentProps } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Editor from '../../Components/Editor';
import { GET_NOTE, EDIT_NOTE } from '../../queries';
import { Params, NoteResponse } from '../../types/types';
import { Note, MutationEditNoteArgs } from '../../types/graph';

type Props = RouteComponentProps;

const Edit: React.FC<Props> = () => {
  const params = useParams<Params>();
  const { data } = useQuery<NoteResponse>(GET_NOTE, {
    variables: { id: params.id },
  });

  const history = useHistory();
  const [editNoteMutation] = useMutation<Note, MutationEditNoteArgs>(EDIT_NOTE);
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
