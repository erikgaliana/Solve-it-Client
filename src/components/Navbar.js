import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../lib/AuthProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faHome } from "@fortawesome/free-solid-svg-icons";

class Navbar extends Component {
  render() {
    const { user, logout, isLoggedin } = this.props;
    return (
      <div >
        {/* // style={{ borderRadius: '5px', padding: '20px', background: '#686de0' }}> */}
        {isLoggedin ? (
          <div id="Navbar">
            {/* <p>Hi ! {user.username}</p>
            <button onClick={logout}>Logout</button><br /> */}
            {/* <FontAwesomeIcon icon={faCoffee} style={{ color: 'white' }} />
            <FontAwesomeIcon icon={faHome} style={{ color: 'white' }}/> */}
            
            <nav class="level is-mobile">
             <Link to="/MyProblems">
              {' '}
              <div class="level-item has-text-centered">
              <div>
              <button className="button is-small is-info is-inverted is-outlined">My Problems</button>{' '}
           
              
              </div>
             </div>
            </Link>
            <Link to="/AskProblem">
              {' '}
              <div class="level-item has-text-centered">
                <div>
              <button className="button is-small is-info is-inverted is-outlined">Ask a problem</button>{' '}
              </div>
              </div>
            </Link>
            
            <Link to="/ProblemsToSolve">
              {' '}
              <div class="level-item has-text-centered">
                <div>
              <button className="button is-small is-info is-inverted is-outlined">Problems to Solve</button>{' '}
              </div>
              </div>
            </Link>
            <Link to="/UserProfile">
              {' '}
              <div class="level-item has-text-centered">
                <div>
              <button className="button is-small is-info is-inverted is-outlined">User Profile</button>{' '}
              </div>
             </div>
            </Link>
            </nav>
            </div>
            
        ) : null}
      </div>
    );
  }
}

export default withAuth(Navbar);
