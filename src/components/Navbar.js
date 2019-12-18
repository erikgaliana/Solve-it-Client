import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../lib/AuthProvider';

class Navbar extends Component {
  render() {
    const { user, logout, isLoggedin } = this.props;
    return (
      <div >
        {/* // style={{ borderRadius: '5px', padding: '20px', background: '#686de0' }}> */}
        {isLoggedin ? (
          <div className="Navbar">
            {/* <p>Hi ! {user.username}</p>
            <button onClick={logout}>Logout</button><br /> */}

            <br />
             <Link to="/MyProblems">
              {' '}
              <button className="button is-small is-info is-inverted is-outlined">My Problems</button>{' '}
            </Link>
            <Link to="/AskProblem">
              {' '}
              <button className="button is-small is-info is-inverted is-outlined">Ask a problem</button>{' '}
            </Link>
            
            <Link to="/ProblemsToSolve">
              {' '}
              <button className="button is-small is-info is-inverted is-outlined">Problems to Solve</button>{' '}
            </Link>
            <Link to="/UserProfile">
              {' '}
              <button className="button is-small is-info is-inverted is-outlined">User Profile</button>{' '}
            </Link>
            </div>

        ) : null}
      </div>
    );
  }
}

export default withAuth(Navbar);
