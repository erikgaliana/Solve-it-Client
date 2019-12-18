import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../lib/AuthProvider';

class Topbar extends Component {
  render() {
    const { user, logout, isLoggedin } = this.props;
    return (
      <div >
        {/* // style={{ borderRadius: '5px', padding: '20px', background: '#686de0' }}> */}
        {isLoggedin ? (
          <div className="Topbar" >
          <div>
            <h3>Hi ! {user.username}</h3></div>
            <img src="https://res.cloudinary.com/ekgaliana/image/upload/v1576627130/solve-it-app/Solveit_logo_200x200_copy_jpmzu9.png" alt=""></img>
            <button onClick={logout}>Logout</button>

            
          </div>

        ) : (
          <div>
          <img src="https://res.cloudinary.com/ekgaliana/image/upload/v1576627130/solve-it-app/Solveit_logo_200x200_copy_jpmzu9.png" alt=""></img>
            <br />
            <Link to="/login">
              {' '}
              <button>Login</button>{' '}
            </Link>
            
            <Link to="/signup">
              {' '}
              <button>Signup</button>{' '}
            </Link>
          </div>
        )}
      </div>
    );
  }
}

export default withAuth(Topbar);
