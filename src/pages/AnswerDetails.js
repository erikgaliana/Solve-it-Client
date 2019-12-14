import React, { Component } from 'react';
import { withAuth } from '../lib/AuthProvider';
import userService from '../lib/user-service';

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

        // const { id, taskId } = this.props.match.params;
        const { user } = this.state;

        console.log('params', this.props.match.params)

        return (
            <div>
                <h1>Inside answerdetails</h1>
            </div>
        )
    }
}

export default withAuth (AnswerDetails);