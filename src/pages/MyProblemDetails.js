import React, { Component } from 'react';
import userService from '../lib/user-service';
import { withAuth } from '../lib/AuthProvider';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments} from "@fortawesome/free-solid-svg-icons";
import { faQuestionCircle} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";


function getProblem(id,user) {
 const result= user.myproblems.find(element => element._id=== id);

 return result;
}


class MyProblemDetails extends Component {
    state = {
        user:{},
        myproblem:{},
        problemAnswersEmpty : false 
    }

    

    componentDidMount (){
        const { id } = this.props.match.params;
        const userId  = this.props.user._id;
       
        userService.getOneById(userId)
         .then ((oneUser)=>{
            this.setState({user : oneUser});
            this.setState({ myproblem : getProblem(id,oneUser)});
            if(this.state.myproblem.problemanswers.length===0){this.setState({ problemAnswersEmpty : true })}
            })
         .catch ((err) => console.log(err));
    }

    render() {

        const { id } = this.props.match.params;
        const { user } = this.state;
        const { myproblem } = this.state;
        console.log("is empty",this.state.problemAnswersEmpty);
        
        // console.log( "problem id", id);
        // console.log( "user", user);
        


        return (
            
            <div className="Container">

                
                <h2 className="is-size-4">My problem asked is :</h2>
                <div className="problem">
                <FontAwesomeIcon icon={faQuestionCircle} style={{ color: 'white', fontSize: '20px' }}/>
                <h2 className="is-size-4"> 
                    {
                    user.myproblems ?
                    myproblem.text
                    :
                    <p>loading</p>
                    }
                </h2>

                    <img src={myproblem.pic} alt=""></img>
                   </div>     
                    <hr></hr>
                    <h3 className="is-size-4">Answers proposed</h3>
                 {
                       
                user.myproblems ?
                getProblem(id,user).problemanswers.reverse().map((oneanswer)=> {
                            return (
                                
                                <div className='answer' key={oneanswer._id}>
                                <FontAwesomeIcon icon={faComments} style={{ color: 'white', fontSize: '22px' }}/>

                                <Link to={`/MyProblems/details/${id}/AnswerDetails/${oneanswer._id}`} className="text-link">
                                <p className="is-size-4">{oneanswer.text}</p>
                                <img src={oneanswer.pic} alt=""></img>
                                <p> <FontAwesomeIcon icon={faUser} style={{ color: 'white', fontSize: '20px' }}/>
                                   {oneanswer.author.username} </p>
                                 </Link> 
                                </div>
                            )
                    })
                    :
                    <p>loading</p>


                }
                    {
                     this.state.problemAnswersEmpty ?
                     (<br></br>,<h2>No Answers recieved</h2>)
                      : null }

                

                


            </div>
           
        )
    }
}

export default withAuth (MyProblemDetails);