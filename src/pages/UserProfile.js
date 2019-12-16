import React, { Component } from 'react';
import { withAuth } from '../lib/AuthProvider';
import userService from '../lib/user-service';
import { Link } from 'react-router-dom';


function getProblem(id,user) {
    const result= user.mysolvedproblems.find(element => element._id=== id);
   
    return result;
   }

class UserProfile extends Component {
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

        const { user } = this.state;

        console.log("user", user);
        console.log("user solved problems",user.mysolvedproblems);

        
    
        return (
            <div>
                    <div className='Userprofile' >
                            <h2>User's profile</h2>
                        <p>Name : {user.username}</p>
                        <p>Picture : {user.pictureUrl}</p>
                        <p>Expert on : {user.expert}</p>
                        <p>Points : {user.points}</p>

                    </div>

                    <h3>My Problems Solved</h3>
                    {
                    user.mysolvedproblems ?
                    user.mysolvedproblems.map((oneproblem)=> {
                            return (
                                
                                <div className='problem' key={oneproblem._id}>

                                {/* <Link to={`/MyProblems/details/${oneproblem._id}`} className="text-link"> */}
                                
                                <p>Problem :{oneproblem.text}</p>
                                <p>Category : {oneproblem.category}</p>
                                <hr></hr>
                                <p>Solution : {oneproblem.solution[0].text}</p>
                                <p>Solution author: {oneproblem.solution[0].author.username}</p>
                                {/* </Link> */}
                                </div>
                            )
                    })
                    :
                    <p>No solved problems</p>
                }






            </div>
        )
    }
}

export default withAuth(UserProfile);
