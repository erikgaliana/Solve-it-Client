import React, { Component } from 'react';
import userService from '../lib/user-service';
import { withAuth } from '../lib/AuthProvider';
import { Link } from 'react-router-dom';


function getProblem(id,user) {
 const result= user.myproblems.find(element => element._id=== id);

 return result;
}


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

             
                <h2>My problem asked is :</h2>
                
                <h3>
                    {
                    user.myproblems ?
                    getProblem(id,user).text
                    
                    :
                    <p>loading</p>
                    }
                    </h3>

                    {/* <img src={getProblem(id,user).pic} alt=""></img> */}
                        
                    <hr></hr>
                    <h3>Answers proposed</h3>
                    {
                       
                user.myproblems ?
                getProblem(id,user).problemanswers.map((oneanswer)=> {
                            return (
                                
                                <div className='answer' key={oneanswer._id}>

                                <Link to={`/MyProblems/details/${id}/AnswerDetails/${oneanswer._id}`} className="text-link">
                                <p>Answer : {oneanswer.text}</p>
                               
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