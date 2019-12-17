import React, { Component } from 'react';
// import axios from 'axios';
import { withAuth } from '../lib/AuthProvider';
import userService from '../lib/user-service';
import problemService from '../lib/problem-service';
import cloudinaryService from '../lib/cloudinaryService';




class AddProblem extends Component {

    state = {
        user:{},
        description: "",
        category: "dogs",
        pic : "noimage.jpg"
    }

    componentDidMount (){
        
        const id  = this.props.user._id;
        userService.getOneById(id)
        .then ((oneUser)=>{
            this.setState({user : oneUser});
        })
        .catch ((err) => console.log(err));
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const { category ,description , pic} = this.state;
        const { user } = this.state;
        
        problemService.askproblem(category,description,pic, user._id )
        .then( () => {
            
            this.setState({ description: "", category: "dogs", pic : "noimage.jpg"});
            })
            .catch( (err) => console.log(err) )

      }
    
    
      handleChange = (event) => {  
        const {name, value} = event.target;
        this.setState( {[name]: value} );
      }

      handlePhotoChange = event => {
        console.log(event.target.files[0]);
        const file = event.target.files[0];
        const imageFile = new FormData();
        imageFile.append("photo", file);
        cloudinaryService.imageUpload(imageFile)
          .then(imageUrl => {
            console.log("da image ",imageUrl);
            this.setState({ pic: imageUrl, imageReady: true });
            console.log("da picture in da state",this.state.pic);
           });
        
      };

      

    render() {
        

        return (
            <div>

            <h1>Add a problem you would like to be solved</h1>

            <form onSubmit={this.handleFormSubmit}>
          
            <label>Category:</label>
            <select name="category" value={this.state.category} onChange={this.handleChange } >
                <option value="dogs">Dogs</option>
                <option value="cats">Cats</option>
                <option value="parrots">Parrots</option>
                
             </select>

          
          <label>Description:</label>
          <textarea name="description" 
            value={this.state.description} 
            // onChange={ (e) => this.handleChange(e) } />
           onChange={this.handleChange } />

          <input
            type="file"
            name="photo"
            onChange={event => this.handlePhotoChange(event)}
          />

          <button type="submit"  disabled={!this.state.imageReady}>Submit</button>
        </form>
                
            </div>
        )
    }
}

export default withAuth(AddProblem);