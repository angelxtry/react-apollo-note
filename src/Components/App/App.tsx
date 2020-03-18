import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  RouteComponentProps,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Notes from '../../Routes/Notes';
import Note from '../../Routes/Note';
import Edit from '../../Routes/Edit';
import Add from '../../Routes/Add';
import { theme } from '../../style/theme';
import GlobalStyle from '../../style/globalStyle';

type Props = RouteComponentProps

const App: React.FC<Props> = () => {
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
  );
};

export default App;
