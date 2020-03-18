import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_NOTES } from './queries';

function App() {
  const { loading, data } = useQuery(GET_NOTES);
  return (
    <div>
      {!loading && data && data.notes && (
        <>
          <div>{data.notes[0].id}</div>
          <div>{data.notes[0].title}</div>
          <div>{data.notes[0].content}</div>
        </>
      )}
    </div>
  );
}

export default App;
