import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useParams, Link, RouteComponentProps } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import { GET_NOTE } from '../../queries';

const TitleComponent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 50px;
`;

const Title = styled.h1`
  font-size: 50px;
  margin: 0;
  padding: 0;
`;

const Button = styled.button``;

type Props = RouteComponentProps;

const Note: React.FC<Props> = () => {
  const params = useParams() as { id: string };
  const { data } = useQuery(GET_NOTE, {
    variables: { id: params.id },
  });
  return data?.note ? (
    <>
      <TitleComponent>
        <Title>{data.note && data.note.title}</Title>
        <Link to={`/edit/${data.note.id}`}>
          <Button>Edit</Button>
        </Link>
      </TitleComponent>
      <ReactMarkdown source={data.note.content} />
    </>
  ) : (
    <div>Note not found</div>
  );
};

export default Note;
