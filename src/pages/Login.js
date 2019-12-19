import React, { Component } from 'react';
import { withAuth } from '../lib/AuthProvider';
import { Link } from 'react-router-dom';

class Login extends Component {
  state = { username: '', password: '' };

  handleFormSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;
    this.props.login({ username, password });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, password } = this.state;

    return (
      <div>
        
        <form className="loginform" onSubmit={this.handleFormSubmit}>

        <h1 id="loginformh1">Login</h1>
        <div className="field">
          <label className="label">Username:</label>
          <div className="control">
          <input className="input is-info" 
                 type="text"
                name="username"
                value={username}
                onChange={this.handleChange}
          />
           
          </div>
          </div>

          <div className="field">
          <label className="label">Password:</label>
          <div className="control">
          <input className="input is-info" 
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
          </div>
          </div>

          <div className="field is-grouped is-grouped-centered">
             <div className="control">
          <input class="button is-link is-outlined" type="submit" value="Login" />
          </div>
          </div>
        </form>
        <p>Don't have an account?</p>
        <Link to={'/signup'}> Signup</Link>
      
      </div>
    );
  }
}

export default withAuth(Login);
