import React, { Component } from 'react';
import { withAuth } from '../lib/AuthProvider';
import userService from '../lib/user-service';
import problemService from '../lib/problem-service';
import { Link } from 'react-router-dom';

function getProblem(id,user) {
    const result= user.myproblems.find(element => element._id=== id);
   
    return result;
   }

function getAnswer(id,user,AnsId){

    const result= user.myproblems.find(element => element._id=== id).problemanswers.find(element => element._id=== AnsId);
 return result;
}

class AnswerDetails extends Component {

    state = {
        user:{},
        
    }

    updateUser=(e)=>{
        e.preventDefault();
        const { user } = this.state;
        const { id } = this.props.match.params;
        console.log("inside upsating");
        console.log("user id",user._id);
        console.log("problem id", id);

        
        // problemService.updateproblem(id,solution, answerauthorId)
        //     .then(() => { console.log("problem updated")})
        //     .catch( (err) => console.log(err) )


        userService.updateUser(id,user._id) 
        .then( () => {
                console.log("user updatged");
            
            })
            .catch( (err) => console.log(err) )


    }

    componentDidMount (){
        
        
        const userId  = this.props.user._id;
        
        userService.getOneById(userId)
         .then ((oneUser)=>{
            this.setState({user : oneUser});
            })
         .catch ((err) => console.log(err));
    }


    render() {

        const { id, AnsId } = this.props.match.params;
        const { user } = this.state;

        // console.log('params', this.props.match.params)

        return (
            <div>
               
                <h3>My problem asked is : </h3>
                <h3> 
                    {
                    user.myproblems ?
                    getProblem(id,user).text
                    :
                    <p>loading</p>
                    }
                </h3>
                <hr></hr>
                <h3> Answer Details</h3>
                    <div className='answer' >
                    <p>Answer details :{
                    user.myproblems ?
                    getAnswer(id,user,AnsId).text
                    :
                    <p>loading</p>
                    }
                    </p>
                    <p> Picture :{
                    user.myproblems ?
                    getAnswer(id,user,AnsId).pic
                    :
                    <p>loading</p>
                    }
                    </p>
                    </div>
                    <div>
                    {/* <Link to={`/UserProfile`}> */}
                         {' '}
                        <button onClick={this.updateUser}>Add to Problems Solved</button>{' '}
                     {/* </Link> */}
                    </div>
                    <div>
                    <Link to={`/MyProblems/details/${id}`}>
                         {' '}
                        <button>Discard</button>{' '}
                     </Link>
                    </div>

            </div>
        )
    }
}

export default withAuth (AnswerDetails);