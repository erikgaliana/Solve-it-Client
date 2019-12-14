import React, { Component } from 'react';
import userService from '../lib/user-service';
import { withAuth } from '../lib/AuthProvider';
import { Link } from 'react-router-dom';





class MyProblemDetails extends Component {
    state = {
        user:{},
        
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

        const { id } = this.props.match.params;
        const { user } = this.state;

        // console.log( "problem id", id);
        // console.log( "user", user);
        


        return (
            <div>

             
                <h1>inside my problem details</h1>

                
                    
                    {

                user.myproblems ?
                user.myproblems.find(element => element._id=== id).problemanswers.map((oneanswer)=> {
                            return (
                                
                                <div className='answer' key={oneanswer._id}>

                                <Link to={`/MyProblems/details/${id}/AnswerDetails/${oneanswer._id}`}>
                                <p>{oneanswer.text}</p>
                               
                                 </Link> 
                                </div>
                            )
                    })
                    :
                    <p>loading</p>


                }
            </div>
        )
    }
}

export default withAuth (MyProblemDetails);