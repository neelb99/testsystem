import React from 'react';
import Landing from './Components/Landing.component';
import {BrowserRouter, Route} from 'react-router-dom';
import ViewStudents from './Components/ViewStudents.component';
import Leaderboard from './Components/Leaderboard.component';
import AddQuestion from './Components/AddQuestion.component';
import Test from './Components/Test.component';
import ViewReports from './Components/ViewReports.component'

function App() {
  return (
    <BrowserRouter>
      <Route exact path = '/' component={Landing}></Route>
      <Route exact path = '/home'></Route>
      <Route exact path = '/viewstudents' component={ViewStudents}></Route>
      <Route exact path = '/leaderboard' component={Leaderboard}></Route>
      <Route exact path = '/addquestion' component={AddQuestion}></Route>
      <Route exact path = '/test' component={Test}></Route>
      <Route path = '/viewreports/' component={ViewReports}></Route>
    </BrowserRouter>
  );
}

export default App;
