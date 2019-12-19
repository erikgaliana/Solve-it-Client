import React, { Component } from 'react';

import userService from '../lib/user-service';
import { withAuth } from '../lib/AuthProvider';
import OneProblem from '../components/OneProblem';
import problemService from '../lib/problem-service';


class MyProblems extends Component {
    state = {
        user:{},
        problemsempty : false,
        problems :[]
    }

    
    componentDidMount (){  
        const id  = this.props.user._id;
        userService.getOneById(id)
        .then ((oneUser)=>{
            this.setState({
                user : oneUser,
                problems : oneUser.myproblems
            });
            if (oneUser.myproblems.length===0){ this.setState({problemsempty : true });}
            
        })
        .catch ((err) => console.log(err));
        
    }

    // deleteproblem(id,authorID, category)
    
    deleteProblem = (id,author,category)=> {
        
         problemService.deleteproblem(id,author,category)
         .then (()=>{
            
            const newArr = this.state.problems.filter((el) => {
                return el._id !== id
            })
            this.setState({
                problems: newArr
            })
        })
        .catch ((err) => console.log(err));
    }
    
    render() {
        const { problems } = this.state;
       
        return (
            <div className="container">
                
                <h1 className="is-size-3"> Your problems asked</h1>
                
                {
                    problems ?
                    (
                    problems.reverse().map((oneproblem)=> {
                            return (
                                
                                <OneProblem delete={this.deleteProblem} oneProblem={oneproblem} key={oneproblem._id} />
                            )
                    }))
                    :( <h4>loading</h4>)
                    
                }

                { this.state.problemsempty ?
                (<h2>No problems asked</h2>)
                : null }


               
            </div>
        )
    }
}

export default withAuth( MyProblems);