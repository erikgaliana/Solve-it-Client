import React, { Component } from 'react';
import { withAuth } from '../lib/AuthProvider';
import userService from '../lib/user-service';


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
                <h1>Inside answerdetails</h1>

                <h4>
                    {
                    user.myproblems ?
                    getProblem(id,user).text
                    :
                    <p>loading</p>
                    }
                </h4>
                    <div className='answer' >
                    <p>Answer :{
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



            </div>
        )
    }
}

export default withAuth (AnswerDetails);