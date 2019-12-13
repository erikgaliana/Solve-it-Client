import React, { Component } from 'react';

import userService from '../lib/user-service';
import { withAuth } from '../lib/AuthProvider';


class MyProblems extends Component {
    state = {
        user:{}
    }

    componentDidMount (){
        
        console.log(this.props.user._id);
        const id  = this.props.user._id;
        userService.getOneById(id)
        .then ((oneUser)=>{
            this.setState({user : oneUser});
        })
        .catch ((err) => console.log(err));
    }
    
    render() {
        const { user } = this.state;
        return (
            <div>
                <h1>hello ya have a lot ogf MyProblems</h1>
                {
                    user.myproblems ?
                    user.myproblems.map((oneproblem)=> {
                            return (
                                <p>{oneproblem.text}</p>
                            )
                    })
                    :
                    <p>loading</p>
                }

            </div>
        )
    }
}

export default withAuth( MyProblems);