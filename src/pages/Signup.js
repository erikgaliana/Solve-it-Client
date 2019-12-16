import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../lib/AuthProvider';

class Signup extends Component {
  state = { 
    username: '',
    password: '',
    mail :'',
    picture:'',
    points :20,
    expert :'dogs'};

  handleFormSubmit = event => {
    event.preventDefault();
   
    //  console.log('Signup -> form submit', { username, password });
    this.props.signup(this.state); // props.signup is Provided by withAuth() and Context API
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, password,mail,expert} = this.state;
    return (
      <div>
        <h1>Sign Up</h1>
        <form onSubmit={this.handleFormSubmit}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
       
          <label>Mail:</label>
          <input
            type="mail"
            name="mail"
            placeholder="usermail@example.com"
            value={mail}
            onChange={this.handleChange}
          />


          <label>Expert at :</label>
            <select name="expert" value={expert} onChange={this.handleChange } >
                <option value="dogs">Dogs</option>
                <option value="cats">Cats</option>
                <option value="parrots">Parrots</option>
             </select>

          <input type="submit" value="Signup" />
        </form>

        <p>Already have account?</p>
        <Link to={'/login'}> Login</Link>
      </div>
    );
  }
}

export default withAuth(Signup);
