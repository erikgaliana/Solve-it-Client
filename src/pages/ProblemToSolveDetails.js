import React, { Component } from 'react';
import { withAuth } from '../lib/AuthProvider';
import userService from '../lib/user-service';
import answerService from '../lib/answer-service';
import cloudinaryService from '../lib/cloudinaryService';


function getProblem(id,user) {
    const result= user.problemstosolve.find(element => element._id=== id);
    
    // this.setState({pic : result.pic});
    return result;
   }

class ProblemToSolveDetails extends Component {

    state = {
        user:{},
        decription:"",
        problem:{},
        imageReady: false
        
    }

    

    componentDidMount (){
        const { id } = this.props.match.params;
        
        const userId  = this.props.user._id;
        
        userService.getOneById(userId)
         .then ((oneUser)=>{
            this.setState({user : oneUser});
            this.setState({ problem : getProblem(id,oneUser)});
            })
         .catch ((err) => console.log(err));
    }

    handleformsubmit =(event)=> {
        event.preventDefault();
        const { description,pic } = this.state;
        const { id } = this.props.match.params;
        const { user } = this.state;

        // console.log("description", description);
        // description,pic,category,problemtosolve,authorID
        answerService.sendanswer(description,pic,user.expert,id,user._id )
        .then( () => {
            
            this.setState({ description: "", pic : "noimage.jpg"});
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

        const { id } = this.props.match.params;
        const { user } = this.state;
        const { problem } = this.state;

        console.log("problem object", problem)

        return (
            <div>
                <h1> inside problem to solve details</h1>
                <h4>
                    {
                    user.problemstosolve ?
                    problem.text
                    :
                    <p>loading</p>
                    }
                 </h4>
                 <img src={problem.pic} alt=""></img>

                
                 <img src={this.state.pic} alt=""></img>
                 <br></br>

                    <h5>propose solution :</h5>
                 <form onSubmit={this.handleformsubmit}>

                    <label>Aneswer text :</label>
                        <textarea name="description" 
                        value={this.state.description} 
                        onChange={this.handleChange}/>

                    <input
                            type="file"
                            name="photo"
                            onChange={event => this.handlePhotoChange(event)}
          />

                    <button type="submit"  disabled={!this.state.imageReady}>Submit</button>
                    {/* <input type="submit" value="Submit" /> */}

                     </form>
                    
            </div>
        )
    }
}

export default withAuth (ProblemToSolveDetails);
