import React, { Component } from 'react';
import { withAuth } from '../lib/AuthProvider';
import userService from '../lib/user-service';
import problemService from '../lib/problem-service';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments} from "@fortawesome/free-solid-svg-icons";
import { faQuestionCircle} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

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
        const category = getAnswer(id,user,AnsId).category;
        // console.log(answer);
        // console.log("answerauthor",getAnswer(id,user,AnsId).author._id);
           
        // problemService.updateproblem(id,solution, answerauthorId)
        
        const firstPromise = problemService.updateProblem(id,AnsId, category)
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

        const { id } = this.props.match.params;
        const { user } = this.state;
        const { myproblem} = this.state;
        const { answer } = this.state;

        console.log("user charged",this.state.updated);
        console.log("author of answer", answer.author
        );

        // console.log('params', this.props.match.params)

        return (
            <div className="Container">
                
                <h3 className="is-size-4">My problem asked is : </h3>
                <div className="problem">
                <h3 className="is-size-5"> 
                <FontAwesomeIcon icon={faQuestionCircle} style={{ color: 'white', fontSize: '20px' }}/>
                    {
                    user.myproblems ?
                    myproblem.text
                    :
                    <p>loading</p>
                    }
                </h3>
                <img src={myproblem.pic} alt=""></img>
                </div>
                <hr></hr>
                
                    { ((!this.state.updated)&&(user.myproblems)) ?

                     (  <div>
                        <h3 className="is-size-4"> Answer Details</h3>,
                    
                    
                         <div className='answer' >
                         <p className="is-size-4"> 
                         <FontAwesomeIcon icon={faComments} style={{ color: 'white', fontSize: '20px' }}/>
                         { answer.text } </p>
                        
                         <img id="imagedetails" src={answer.pic} alt=""></img>
                         {/* <p> <FontAwesomeIcon icon={faUser} style={{ color: 'white', fontSize: '20px' }}/>
                                   {answer.author.username} </p> */}
                             
                             </div></div>
                     )
                    :  null }


                    { !this.state.updated ?
                    (
                        <div>
                    
                        <button  className="button is-link is-outlined" onClick={this.updateUser}>Add to Problems Solved</button>
                    
                         <Link to={`/MyProblems/details/${id}`}>
                          {' '}
                         <button className="button is-danger is-outlined">Discard</button>
                         
                         {' '}
                         </Link>
                          </div>
                    )
                    : 
                       (<div> <h5>Problem added to problems solved</h5>
                         <Link to={`/UserProfile`}>
                        
                        <button className="button is-link is-outlined">go to profile</button>
                        
                     </Link></div>)}
                        
                   


                



            </div>
        )
    }
}

export default withAuth (AnswerDetails);