import React, { Component } from 'react';
import './styles.css'

export default class Login extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div class="centered-form__form">
        <form onSubmit={this.props.handleSubmit}>
          <div class="form-field">
            <h4>Chat About This Car:</h4>
          </div>
          <div class="form-field">
            <label>Display Name:</label>
            <input type="text" name="name" placeholder="name" onChange={this.props.handleChange} autofocus />
          </div>
          <div class="form-field">
            <label>Room Name: <br /><small className="chat-room">(Type this car's year - NUMBERS ONLY)</small></label>
            <input type="text" name="room" placeholder="room" onChange={this.props.handleChange} />
          </div>
          <div class="form-field">
            <button>Join</button>
          </div>
        </form>
      </div>
    )
  }
};
