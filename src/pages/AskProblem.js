import React, { Component } from 'react';
// import axios from 'axios';
import { withAuth } from '../lib/AuthProvider';
import userService from '../lib/user-service';
import problemService from '../lib/problem-service';
import cloudinaryService from '../lib/cloudinaryService';
import { Link } from 'react-router-dom';




class AddProblem extends Component {

    state = {
        user:{},
        description: "",
        category: "dogs",
        pic : "noimage.jpg",
        imageReady: true ,
        updated : false

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
        
        problemService.askProblem(category,description,pic, user._id )
        .then( () => {
            
            this.setState({ description: "", category: "dogs", pic : "noimage.jpg"});
            this.setState({ updated : true});
            })
            .catch( (err) => console.log(err) )

      }
    
    
      handleChange = (event) => {  
        const {name, value} = event.target;
        this.setState( {[name]: value} );
      }

      handlePhotoChange = event => {
        this.setState({ imageReady: false });
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


          <div className="Container">

            <h1 className="is-size-3">Ask a Problem</h1>

            { !this.state.updated ?
                    (
            <form className="formask" onSubmit={this.handleFormSubmit}>
            
            <div className="field">
              <label className="label">Category:</label>
                <div className="control is-expanded">
                <div className="select is-fullwidth">
                    <select name="category" value={this.state.category} onChange={this.handleChange } >
                      <option value="dogs">Dogs</option>
                      <option value="cats">Cats</option>
                      <option value="parrots">Parrots</option>
                
                    </select>
                </div>
                </div>
            </div>

             <div className="field">     
              <label className="label">Description:</label>
                <div className="control">
                  <textarea className="textarea is-focused" name="description" 
                     value={this.state.description} 
                      // onChange={ (e) => this.handleChange(e) } />
                      onChange={this.handleChange } />
                </div>
              </div>

              <label className="label">Upload Image</label>
              <input className="input" 
                type="file"
                name="photo"
                onChange={event => this.handlePhotoChange(event)}
              />

            <div  className="field is-grouped is-grouped-centered" id="submitButtonAskproblem">
              <div className="control">
                  <button type="submit" className="button is-link is-outlined" disabled={!this.state.imageReady}>Submit</button>
              </div>
             
            </div>

   


            </form>
        )
          :  
               ( <div>
                  <h4>Problem Sent</h4>
                  <Link to={`/MyProblems`}>
                     
                  <button className="button is-link is-outlined">Go to my problems asked</button>
                        
                  </Link></div>)
          } 
                
          </div>
        )
    }
}

export default withAuth(AddProblem);