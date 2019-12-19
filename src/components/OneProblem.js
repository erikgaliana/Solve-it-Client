import React, { Component } from "react";
import { Link } from 'react-router-dom';

export default class OneProblem extends Component {
  render() {
      console.log(this.props);
      
    return (
      <div className="problem">
        <Link
          to={`/MyProblems/details/${this.props.oneProblem._id}`}
          className="text-link"
        >
          <p className="is-size-4">{this.props.oneProblem.text}</p>
          <p className="is-size-5">Category :  {this.props.oneProblem.category}</p>
          <p className="is-size-5">Answers :  {this.props.oneProblem.problemanswers.length}</p>
        </Link>
        <button key={this.props.oneProblem._id} onClick={() => this.props.delete(this.props.oneProblem._id,this.props.oneProblem.author,this.props.oneProblem.category)}>
          Delete
        </button>
      </div>
    );
  }
}
