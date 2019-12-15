import React, { Component } from 'react';
// import axios from 'axios';
import { withAuth } from '../lib/AuthProvider';
import userService from '../lib/user-service';
import problemService from '../lib/problem-service';




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
        // console.log(user);
        
        
        // console.log("category",  category);
        // console.log("description", description);
        // console.log("pic :", pic);
        // console.log("user id ", user._id);
        
        problemService.askproblem(category,description,pic, user._id )
        .then( () => {
            
            this.setState({ description: "", category: "dogs", pic : "noimage.jpg"});
            })
            .catch( (err) => console.log(err) )

        //  axios.post("http://localhost:5000/problems", { category, text : description,pic, authorID  : user._id })
        //     .then( () => {
            
        //     this.setState({ description: "", category: "dogs", pic : "noimage.jpg"});
        //     })
        //     .catch( (err) => console.log(err) )
      }
    
    
      handleChange = (event) => {  
        const {name, value} = event.target;
        this.setState( {[name]: value} );
      }


      

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

            {/* <label>Title:</label>
          <input type="text" 
            name="title" 
            value={this.state.title} 
            onChange={ (e) => this.handleChange(e) }/> */}
          
          <label>Description:</label>
          <textarea name="description" 
            value={this.state.description} 
            // onChange={ (e) => this.handleChange(e) } />
           onChange={this.handleChange } />

          <input type="submit" value="Submit" />
        </form>
                
            </div>
        )
    }
}

export default withAuth(AddProblem);