import React, { Component } from 'react';
import { withAuth } from '../lib/AuthProvider';
import userService from '../lib/user-service';
import answerService from '../lib/answer-service';


function getProblem(id,user) {
    const result= user.problemstosolve.find(element => element._id=== id);
   
    return result;
   }

class ProblemToSolveDetails extends Component {

    state = {
        user:{},
        decription:"",
        pic:"noimage.jpg"
        
    }

    

    componentDidMount (){
        
        
        const userId  = this.props.user._id;
        
        userService.getOneById(userId)
         .then ((oneUser)=>{
            this.setState({user : oneUser});
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


    render() {

        const { id } = this.props.match.params;
        const { user } = this.state;


        return (
            <div>
                <h1> inside problem to solve details</h1>
                <h4>
                {
                    user.problemstosolve ?
                    getProblem(id,user).text
                    :
                    <p>loading</p>
                    }
                 </h4>
                 <br></br>

                    <h5>propose solution :</h5>
                 <form onSubmit={this.handleformsubmit}>

                    <label>Aneswer text :</label>
                        <textarea name="description" 
                        value={this.state.description} 
                        onChange={this.handleChange}/>




                    <input type="submit" value="Submit" />

                     </form>
                    
            </div>
        )
    }
}

export default withAuth (ProblemToSolveDetails);
