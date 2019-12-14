import React, { Component } from 'react';
import { withAuth } from '../lib/AuthProvider';
import userService from '../lib/user-service';
// import { Link } from 'react-router-dom';



class ProblemsToSolve extends Component {
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

        return (
            <div>
            <h2> problems to solve </h2>
                {
                    user.problemstosolve ?
                    user.problemstosolve.map((oneproblem)=> {
                            return (
                                
                                <div className='problem' key={oneproblem._id} >

                                {/* <Link to={`/MyProblems/details/${oneproblem._id}`}> */}
                                <p>Problem : {oneproblem.text}</p>
                                <p>Pic : {oneproblem.pic}</p>
                                <p>author : {oneproblem.author.username}</p>
                                
                                {/* </Link> */}
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

export default withAuth (ProblemsToSolve);
