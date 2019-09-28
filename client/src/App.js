import React from 'react';
import Landing from './Components/Landing.component';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import ViewStudents from './Components/ViewStudents.component';
import Leaderboard from './Components/Leaderboard.component';
import AddQuestion from './Components/AddQuestion.component';
import Test from './Components/Test.component';
import ViewReports from './Components/ViewReports.component'
import Home from './Components/Home.component';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route exact path = '/home' component={Home}></Route>
      <Route exact path = '/viewstudents' component={ViewStudents}></Route>
      <Route exact path = '/leaderboard' component={Leaderboard}></Route>
      <Route exact path = '/addquestion' component={AddQuestion}></Route>
      <Route exact path = '/test' component={Test}></Route>
      <Route path = '/viewreports/' component={ViewReports}></Route>
      <Route path = '/' component={Landing}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
