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
        myproblem:{},
    }

    

    componentDidMount (){
        const { id } = this.props.match.params;
        const userId  = this.props.user._id;
        
        userService.getOneById(userId)
         .then ((oneUser)=>{
            this.setState({user : oneUser});
            this.setState({ myproblem : getProblem(id,oneUser)});
            })
         .catch ((err) => console.log(err));
    }

    render() {

        const { id } = this.props.match.params;
        const { user } = this.state;
        const { myproblem } = this.state;
        
        
        // console.log( "problem id", id);
        // console.log( "user", user);
        


        return (
            <div>

             
                <h2>My problem asked is :</h2>
                
                <h3>
                    {/* {
                    user.myproblems ?
                    getProblem(id,user).text
                    
                    :
                    <p>loading</p>
                    } */}

                    {
                    user.myproblems ?
                    myproblem.text
                    :
                    <p>loading</p>
                    }
                    </h3>

                    <img src={myproblem.pic} alt=""></img>
                        
                    <hr></hr>
                    <h3>Answers proposed</h3>
                    {
                       
                user.myproblems ?
                getProblem(id,user).problemanswers.map((oneanswer)=> {
                            return (
                                
                                <div className='answer' key={oneanswer._id}>

                                <Link to={`/MyProblems/details/${id}/AnswerDetails/${oneanswer._id}`} className="text-link">
                                <p>Answer : {oneanswer.text}</p>
                                <p> Answer picture :<br></br> <img src={oneanswer.pic} alt=""></img></p>
                                <p> Answer author : {oneanswer.author.username} </p>
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