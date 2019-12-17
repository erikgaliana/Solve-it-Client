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
        updated:false,
        myproblem:{},
        answer:{}
        
    }

    updateUser=(e)=>{
        // e.preventDefault();
        const { user } = this.state;
        const { id,AnsId} = this.props.match.params;
        // console.log("inside upsating");
        // console.log("user id",user._id);
        // console.log("problem id", id);
        // console.log("answerId", AnsId);
        const answerauthorId = getAnswer(id,user,AnsId).author._id;
        // console.log(answer);
        // console.log("answerauthor",getAnswer(id,user,AnsId).author._id);
           
        // problemService.updateproblem(id,solution, answerauthorId)
        
        const firstPromise = problemService.updateproblem(id,AnsId, answerauthorId)
            .then(() => { console.log("problem updated")})
            .catch( (err) => console.log(err) )

        const secondPromise = userService.updateUser(id,user._id) 
        .then( () => {
                console.log("user updateded");
            
            })
            .catch( (err) => console.log(err) )

        Promise.all([firstPromise, secondPromise])
        .then( () => {
            // console.log("user and problem updated");
            // window.redirect("http://localhost:3000/UserProfile");
            this.setState({ updated : true});
            // console.log(this.state.updated);
            
        })
        .catch( (err) => console.log(err));


    }

    componentDidMount (){
        
        const userId  = this.props.user._id;
        const { id, AnsId } = this.props.match.params;

        
        userService.getOneById(userId)
         .then ((oneUser)=>{
            this.setState({user : oneUser});
            this.setState({ myproblem : getProblem(id,oneUser)});
            this.setState({ answer : getAnswer(id,oneUser,AnsId)});

            })
         .catch ((err) => console.log(err));
    }


    render() {

        const { id, AnsId } = this.props.match.params;
        const { user } = this.state;
        const { myproblem} = this.state;
        const { answer } = this.state;

        console.log("user charged",this.state.updated)

        // console.log('params', this.props.match.params)

        return (
            <div>
               
                <h3>My problem asked is : </h3>
                <h3> 
                    {
                    user.myproblems ?
                    myproblem.text
                    :
                    <p>loading</p>
                    }
                </h3>
                <img src={myproblem.pic} alt=""></img>
                <hr></hr>
                
                    { ((!this.state.updated)&&(user.myproblems)) ?

                     (
                        <h3> Answer Details</h3>,
                    
                    
                         <div className='answer' >
                         <p>Answer details : { answer.text } </p>
                         {answer.pic ?
                         (<p> Picture : </p>,<br></br>)
                        : null }
                         <img src={answer.pic} alt=""></img>
                    
                        </div>
                     )
                    :  null }


                    { !this.state.updated ?
                    (
                        <div>
                    
                        <button onClick={this.updateUser}>Add to Problems Solved</button>
                    
                         <Link to={`/MyProblems/details/${id}`}>
                          {' '}
                         <button>Discard</button>
                         
                         {' '}
                         </Link>
                          </div>
                    )
                    : 
                       (<div> <h5>Problem added to problems solved</h5>
                         <Link to={`/UserProfile`}>
                        
                        <button>go to profile</button>
                        
                     </Link></div>)}
                        
                   


                



            </div>
        )
    }
}

export default withAuth (AnswerDetails);