import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import userService from '../lib/user-service';
import { withAuth } from '../lib/AuthProvider';


class MyProblems extends Component {
    state = {
        user:{},
        
    }

    componentDidMount (){
        
        
        const id  = this.props.user._id;
        userService.getOneById(id)
        .then ((oneUser)=>{
            this.setState({user : oneUser});
        })
        .catch ((err) => console.log(err));
    }
    
    
    render() {
        const { user } = this.state;
        console.log(user);
        
        return (
            <div>
                <h1>Welcome to solve it</h1>
                <h2> your posted problems</h2>
                {
                    user.myproblems ?
                    user.myproblems.map((oneproblem)=> {
                            return (
                                
                                <div className='problem' key={oneproblem._id}>

                                <Link to={`/MyProblems/details/${oneproblem._id}`} className="text-link">
                                <p>Category : {oneproblem.category}</p>
                                <p>Problem :{oneproblem.text}</p>
                                <p>Answers : {oneproblem.problemanswers.length}</p>
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

export default withAuth( MyProblems);