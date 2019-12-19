import React, { Component } from 'react';
import { withAuth } from '../lib/AuthProvider';
import userService from '../lib/user-service';
import answerService from '../lib/answer-service';
import cloudinaryService from '../lib/cloudinaryService';
import { Link } from 'react-router-dom';


function getProblem(id,user) {
    const result= user.problemstosolve.find(element => element._id=== id);
    
    // this.setState({pic : result.pic});
    return result;
   }

class ProblemToSolveDetails extends Component {

    state = {
        user:{},
        description:"",
        problem:{},
        imageReady: true,
        updated : false
        
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

        // const { id } = this.props.match.params;
        const { user } = this.state;
        const { problem } = this.state;

        // console.log("problem object", problem)

        return (
            <div className="Container">
                <h1 className="is-size-4"> Problem to solve details</h1>
                <div className="problem">
                
                <h4> Problem asked : </h4>
                    <h4>
                    {
                    user.problemstosolve ?
                    problem.text
                    :
                    <p>loading</p>
                    }
                 </h4>
                 <img src={problem.pic} alt=""></img>

                
                 </div>
                 

                    <h3 className="is-size-4">Propose solution :</h3>
                    { !this.state.updated ?
                    (
                        <form className="formsolution" onSubmit={this.handleformsubmit}>
                        
                        <div className="field">
                         <label className="label">Answer text :</label>
                            <div className="control">
                            <textarea className="textarea is-focused" name="description" 
                            value={this.state.description} 
                            onChange={this.handleChange}/>
                            </div></div>

                            <label className="label">Upload Image</label>
                        <input className="input" 
                            type="file"
                            name="photo"
                            onChange={event => this.handlePhotoChange(event)}
                        />

                    <div  className="field is-grouped is-grouped-centered" id="submitButtonAskproblem">
                    <div className="control">
                        <button type="submit"  className="button is-link" disabled={!this.state.imageReady}>Submit</button>
                    {/* <input type="submit" value="Submit" /> */}
                    </div></div>
                     </form>)
                    :  
                     ( <h4>Answer Sent</h4> ,
                         <Link to={`/MyProblems`}>
                     
                            <button>go to my problems</button>
                        
                        </Link>)
                    } 
                    
            </div>
        )
    }
}

export default withAuth (ProblemToSolveDetails);
