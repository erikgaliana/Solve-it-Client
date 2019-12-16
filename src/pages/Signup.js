import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../lib/AuthProvider';
import cloudinaryService from '../lib/cloudinaryService';

class Signup extends Component {
  state = { 
    username: '',
    password: '',
    mail :'',
    picture:'',
    points :20,
    expert :'dogs',
    imageReady:false
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log("before senddin'",this.state);
    //  console.log('Signup -> form submit', { username, password });
    this.props.signup(this.state); // props.signup is Provided by withAuth() and Context API
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };



handlePhotoChange = event => {
    console.log(event.target.files[0]);
    const file = event.target.files[0];
    const imageFile = new FormData();
    imageFile.append("photo", file);
    cloudinaryService.imageUpload(imageFile)
      .then(imageUrl => {
        console.log("da image ",imageUrl);
        this.setState({ picture: imageUrl, imageReady: true });
        console.log("da picture in da state",this.state.picture);
       });
    
  };

  render() {
    const { username, password,mail,expert} = this.state;
    return (
      <div>
        <h1>Sign Up</h1>
        <form onSubmit={this.handleFormSubmit} encType="multipart/form-data">
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

             <input
            type="file"
            name="photo"
            onChange={event => this.handlePhotoChange(event)}
          />

          <button type="submit"  disabled={!this.state.imageReady}>Submit</button>
        </form>

        <p>Already have account?</p>
        <Link to={'/login'}> Login</Link>
      </div>
    );
  }
}

export default withAuth(Signup);
