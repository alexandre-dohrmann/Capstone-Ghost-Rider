import React, { Component } from 'react';
import { Button } from 'reactstrap';
import classes from './addComment.css';



class CreateComment extends Component {
  constructor() {
    super();

    this.state = {
      comment: '',
      car: '',
    }
  }

  updateComment = (e) => {
    let carId = this.props.carID;
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
    this.setState({ car: carId });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.addComment.bind(this, this.state)}>
          <textarea className="comment-box" type="textarea" name="comment" onChange={this.updateComment} placeholder='add comment/review' /><br /><br />
          <Button type='reset' value="Reset">Reset</Button>
          <Button type='Submit'>Comment</Button>
        </form>
      </div>

    )
  }
}

export default CreateComment;
