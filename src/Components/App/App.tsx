import React from 'react';
// import { useQuery } from '@apollo/react-hooks';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
// import { GET_NOTES } from '../../queries';
import Notes from '../../Routes/Notes';
import Note from '../../Routes/Note';
import Edit from '../../Routes/Edit';
import Add from '../../Routes/Add';
import { theme } from '../../style/theme';
import GlobalStyle from '../../style/globalStyle';

function App() {
  // const { loading, data } = useQuery(GET_NOTES);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Notes} />
          <Route path="/note/:id" component={Note} />
          <Route path="/edit:id" component={Edit} />
          <Route path="/add" component={Add} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
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
