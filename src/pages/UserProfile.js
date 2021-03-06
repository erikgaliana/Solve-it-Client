import React, { Component } from 'react';
import { withAuth } from '../lib/AuthProvider';
import userService from '../lib/user-service';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments} from "@fortawesome/free-solid-svg-icons";
import { faQuestionCircle} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";


// function getProblem(id,user) {
//     const result= user.mysolvedproblems.find(element => element._id=== id);
   
//     return result;
//    }

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
            <div className="Container">
                    <div className='Userprofile' >
                        <img src={user.pictureUrl} alt="userimg" ></img>
                            <h2>User's profile</h2>
                        <p>Name : {user.username}</p>
                        
                        <p>Expert on : {user.expert}</p>
                        {/* <p>Points : {user.points}</p> */}
                        {/* <Link to={`/EditUserProfile`}>
                     
                         <button>Edit User Profile</button>
                        
                         </Link> */}

                    </div>

                    <h3>My Problems Solved</h3>
                    {
                    user.mysolvedproblems ?
                    user.mysolvedproblems.reverse().map((oneproblem)=> {
                            return (
                                
                                <div className='problem' key={oneproblem._id}>

                                {/* <Link to={`/MyProblems/details/${oneproblem._id}`} className="text-link"> */}
                                
                                <p className="is-size-5">
                                 <FontAwesomeIcon icon={faQuestionCircle} style={{ color: 'white', fontSize: '20px' }}/>
                                : {oneproblem.text}</p>
                                <img src={oneproblem.pic} alt=""></img>
                                <p className="is-size-6">Category : {oneproblem.category}</p>
                                <hr></hr>
                                <p className="is-size-5">
                                 <FontAwesomeIcon icon={faComments} style={{ color: 'white', fontSize: '20px' }}/>
                                : {oneproblem.solution[0].text}</p>
                                <img src={oneproblem.solution[0].pic} alt=""></img>
                                <p className="is-size-6">
                                <FontAwesomeIcon icon={faUser } style={{ color: 'white', fontSize: '20px' }}/>
                                : {oneproblem.solution[0].author.username}</p>
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
