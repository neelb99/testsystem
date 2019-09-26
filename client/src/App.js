import React from 'react';
import Landing from './Components/Landing.component';
import {BrowserRouter, Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Route exact path = '/' component={Landing}></Route>
      <Route exact path = '/home'></Route>
    </BrowserRouter>
  );
}

export default App;
