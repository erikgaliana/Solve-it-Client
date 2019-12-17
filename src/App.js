import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import "./App.css";

import Signup from './pages/Signup';
import Login from './pages/Login';
import Private from './pages/Private';
import Navbar from './components/Navbar';
import MyProblems from './pages/MyProblems';
import MyProblemDetails from './pages/MyProblemDetails';
import AnswerDetails from './pages/AnswerDetails';
import ProblemsToSolve from './pages/ProblemsToSolve';
import ProblemToSolveDetails from './pages/ProblemToSolveDetails';
import AskProblem from './pages/AskProblem';
import UserProfile from './pages/UserProfile';
import EditUserProfile from './pages/EditUserProfile'

import AnonRoute from './components/AnonRoute';
import PrivateRoute from './components/PrivateRoute';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
      
        <Switch>
          <AnonRoute exact path="/signup" component={Signup} />
          <AnonRoute exact path="/login" component={Login} />
          <PrivateRoute exact path="/private" component={Private} /> 
          <PrivateRoute exact path="/MyProblems" component={MyProblems} />
          <PrivateRoute exact path="/MyProblems/details/:id" component={MyProblemDetails} />
          <PrivateRoute exact path="/MyProblems/details/:id/AnswerDetails/:AnsId" component={AnswerDetails} />
          <PrivateRoute exact path="/ProblemsToSolve" component={ProblemsToSolve} />
          <PrivateRoute exact path="/ProblemsToSolve/details/:id" component={ProblemToSolveDetails} />
          <PrivateRoute exact path="/AskProblem" component={AskProblem} />
          <PrivateRoute exact path="/UserProfile" component={UserProfile} />
          <PrivateRoute exact path="/EditUserProfile" component={EditUserProfile} />

        </Switch>
      </div>
    );
  }
}

export default App;
