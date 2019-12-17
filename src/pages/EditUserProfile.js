import React, { Component } from 'react';
import { withAuth } from '../lib/AuthProvider';
import cloudinaryService from '../lib/cloudinaryService';
import { Link } from 'react-router-dom';
import userService from '../lib/user-service';

 class EditUserProfile extends Component {

    state = { 
        user:{},
        username: '',
        password: '',
        mail :'',
        picture:'',
        points :0,
        expert :'dogs',
        imageReady:true
      };


        componentDidMount (){
            console.log('user id from props',this.props.user._id);
            const id  = this.props.user._id;
            userService.getOneById(id)
            .then ((oneUser)=>{
                this.setState({user : oneUser});
            
            })
            .catch ((err) => console.log(err));
        }


        handleFormSubmit = event => {

            event.preventDefault();
            console.log("before senddin'",this.state.user);
            //  console.log('Signup -> form submit', { username, password });
            // this.props.signup(this.state); // props.signup is Provided by withAuth() and Context API
        };
    
        handleChange = event => {
            const { name, value } = event.target;
            this.setState({ [name]: value });
         };
    
        handlePhotoChange = event => {
            this.setState({ imageReady: false });
            console.log(event.target.files[0]);
            const file = event.target.files[0];
            const imageFile = new FormData();
            imageFile.append("photo", file);
            cloudinaryService.imageUpload(imageFile)
            .then(imageUrl => {
            
                    this.setState({ picture: imageUrl, imageReady: true });
                
                    });
        };


    render() {
        const { username, password,mail,expert} = this.state.user;

        return (
            <div>
                <h1>Edit Profile</h1>
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

                <p>Want to to get back to user profile?</p>
                <Link to={'/UserProfile'}> <button>User profile</button></Link>
            </div>
    );
    }
}

export default withAuth (EditUserProfile);
