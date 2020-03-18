import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { GET_NOTES } from '../../queries';
import Notes from '../../Routes/Notes';
import Note from '../../Routes/Note';
import Edit from '../../Routes/Edit';
import Add from '../../Routes/Add';

function App() {
  const { loading, data } = useQuery(GET_NOTES);
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Notes} />
        <Route path="/note/:id" component={Note} />
        <Route path="/edit:id" component={Edit} />
        <Route path="/add" component={Add} />
      </Switch>
    </BrowserRouter>
    // <div>
    //   {!loading && data && data.notes && (
    //     <>
    //       <div>{data.notes[0].id}</div>
    //       <div>{data.notes[0].title}</div>
    //       <div>{data.notes[0].content}</div>
    //     </>
    //   )}
    // </div>
  );
}

export default App;
