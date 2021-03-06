import React from 'react';
import styled from 'styled-components';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { GET_NOTES } from '../../queries';
import Plus from '../../Components/Plus';
import { Notes } from '../../types/types';
import { Note } from '../../types/graph';

const Header = styled.div`
  margin-bottom: 50px;
`;

const Title = styled.h1`
  font-size: 50px;
  font-weight: 600;
  margin: 0;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
`;

const Button = styled.div`
  margin-left: 10px;
  transform: scale(0.8);
  background-color: #eee;
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
`;

const Subtitle = styled.h2`
  color: #a2a19e;
  font-weight: 400;
`;

const NotesStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const NoteStyle = styled.div`
  padding: 10px;
  padding-left: 5px;
  transition: background-color 0.1s linear;
  cursor: pointer;
  border-radius: 5px;
  margin-bottom: 10px;
  &:hover {
    background-color: #eeeeee;
  }
`;

const NoteTitle = styled.span`
  padding-bottom: 5px;
  font-weight: 600;
  font-size: 20px;
`;

type Props = RouteComponentProps;

const NotesContainer: React.FC<Props> = () => {
  const { data } = useQuery<Notes>(GET_NOTES);

  return (
    <>
      <Header>
        <Title>
          Nomad Notes
          <Button>
            <Plus goTo="/add" />
          </Button>
        </Title>
        <Subtitle>Taking notes while we learn.</Subtitle>
      </Header>
      <NotesStyle>
        {data?.notes.map((note: Note) => (
          <Link to={`/note/${note.id}`} key={note.id}>
            <NoteStyle>
              <NoteTitle>{note.title}</NoteTitle>
            </NoteStyle>
          </Link>
        ))}
      </NotesStyle>
    </>
  );
};

export default NotesContainer;
