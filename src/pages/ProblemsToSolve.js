import React, { Component } from 'react';
import { withAuth } from '../lib/AuthProvider';
import userService from '../lib/user-service';
import { Link } from 'react-router-dom';



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
        // console.log(user);

        return (
            <div className="Container">
            <h1 className="is-size-3"> Problems to solve </h1>
                {
                    user.problemstosolve ?
                    user.problemstosolve.reverse().map((oneproblem)=> {
                            return (
                                
                                <div className='problem' key={oneproblem._id} >

                                <Link to={`/ProblemsToSolve/details/${oneproblem._id}`} className="text-link">
                                <p className="is-size-4"> {oneproblem.text}</p>
                                 <img src={oneproblem.pic} alt=""></img>
                                <p className="is-size-6">Author : {oneproblem.author.username}</p>
                                <p className="is-size-6">Category : {oneproblem.category}</p>
                                
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

export default withAuth (ProblemsToSolve);
