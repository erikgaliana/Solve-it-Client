import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments} from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faQuestionCircle} from "@fortawesome/free-solid-svg-icons";

export default class OneProblem extends Component {
  render() {
      console.log(this.props);
      
    return (
      <div className="problem">
        <Link
          to={`/MyProblems/details/${this.props.oneProblem._id}`}
          className="text-link">
          <FontAwesomeIcon icon={faQuestionCircle} style={{ color: 'white', fontSize: '25px' }}/>
          <p className="is-size-5">{this.props.oneProblem.text}</p>
          <img src={this.props.oneProblem.pic} alt=""></img>
         <div>
          <p className="is-size-6">Category :  {this.props.oneProblem.category}</p>
          
          <p className="is-size-6">
          <FontAwesomeIcon icon={faComments} style={{ color: 'white', fontSize: '22px' }}/>
           Answers {this.props.oneProblem.problemanswers.length}</p></div>
        </Link>
        <button className="DeleteButton" key={this.props.oneProblem._id} onClick={() => this.props.delete(this.props.oneProblem._id,this.props.oneProblem.author,this.props.oneProblem.category)}>
          <FontAwesomeIcon icon={faTrash} style={{ color: 'white', fontSize: '20px' }}/>
        </button>
      </div>
    );
  }
}
