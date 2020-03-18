import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { GET_NOTES } from '../../queries';
import Plus from '../../Components/Plus';

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

const Note = styled.div`
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

const NotesContainer: React.FC = () => {
  const { data } = useQuery(GET_NOTES);

  return (
    <>
      <Header>
        <Title>
          Nomad Notes
          <Link to="/add">
            <Button>
              <Plus backTo="/" />
            </Button>
          </Link>
        </Title>
        <Subtitle>Taking notes while we learn.</Subtitle>
      </Header>
      {data
        ? data.notes.map((note: any) => (
          <Link to={`/edit/${note.id}`} key={note.id}>
            <Note>{note.title}</Note>
          </Link>
          ))
        : ''}
    </>
  );
};

export default NotesContainer;
