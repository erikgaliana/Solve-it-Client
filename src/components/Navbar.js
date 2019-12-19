import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../lib/AuthProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faQuestionCircle} from "@fortawesome/free-solid-svg-icons";
import { faComments} from "@fortawesome/free-solid-svg-icons";
import { faComment} from "@fortawesome/free-solid-svg-icons";

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
            
            
           
           
            <nav className="level is-mobile">
             <Link to="/MyProblems">
              {' '}
              <div className="level-item has-text-centered">
              <div>
              {/* <button className="button is-small is-info is-inverted is-outlined">My Problems</button>{' '} */}
              <FontAwesomeIcon icon={faComment} style={{ color: 'white', fontSize: '40px' }}/> 
              
              </div>
             </div>
            </Link>
            <Link to="/AskProblem">
              {' '}
              <div className="level-item has-text-centered">
                <div>
              {/* <button className="button is-small is-info is-inverted is-outlined">Ask a problem</button>{' '} */}
              <FontAwesomeIcon icon={faQuestionCircle} style={{ color: 'white', fontSize: '40px' }}/> 
              </div>
              </div>
            </Link>
            
            <Link to="/ProblemsToSolve">
              {' '}
              <div className="level-item has-text-centered">
                <div>
              {/* <button className="button is-small is-info is-inverted is-outlined">Problems to Solve</button>{' '} */}
              <FontAwesomeIcon icon={faComments} style={{ color: 'white', fontSize: '40px' }}/> 
              </div>
              </div>
            </Link>
            <Link to="/UserProfile">
              {' '}
              <div className="level-item has-text-centered">
                <div>
              {/* <button className="button is-small is-info is-inverted is-outlined">User Profile</button>{' '} */}
              <FontAwesomeIcon icon={faUser} style={{ color: 'white', fontSize: '35px' }}/> 
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
