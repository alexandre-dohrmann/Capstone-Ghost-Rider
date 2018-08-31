import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import Login from './Login';
import ChatBoard from './ChatBoard';
import { socket } from '../index.js';

class ChatApp extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      room: '',
      loggedIn: false
    }
  }

  handleChange = (e) => {

    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      name: this.state.name,
      room: this.state.room,
      loggedIn: !this.state.loggedIn
    })

    socket.emit('join', {
      name: this.state.name,
      room: this.state.room
    });

  }
  render() {
    return (
      <div className="App chatting">
        {this.state.loggedIn ? <ChatBoard user={this.state.name} /> : <Login handleChange={this.handleChange} handleSubmit={this.handleSubmit} />}
      </div>
    );
  }
}

export default ChatApp;
