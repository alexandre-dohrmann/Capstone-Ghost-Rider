// ref Jim Haff's code
import React, { Component } from 'react';
import { socket } from '../index'
import './styles.css';
// import ChatRoom from '../ChatRoom';

// Smart Component
export default class ChatBoard extends Component {
  constructor() {
    super();

    this.state = {
      usernames: [],
      messages: [],
      newMessage: '',
    }
  }

  componentDidMount() {
    socket.on('connect', function () {
      console.log('Connected to server');
    });

    socket.on('disconnect', function () {
      console.log('Disconnected from server');
    });

    // set up the listener for the users,
    socket.on('updateUserList', (username) => {
      console.log("New User Joined");
      console.log(username);

      this.setState({
        // usernames: [...this.state.usernames, username]});      
        usernames: username
      });

    });

    // listen for new messages sent from server
    socket.on('newMessage', (message) => {
      console.log('## Got New Message');
      console.log('## Message is ', message)
      console.log('## Message.text is ', message.text);
      this.setState({
        messages: [...this.state.messages, message]
      })
    });

  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    // await this.setState({
    //   messages: [...this.state.messages, this.state.newMessage]
    // })
    console.log('User is: ', this.props.user);
    console.log('Messages is :', this.state.newMessage);

    socket.emit('createMessage', {
      text: this.state.newMessage
    }, function () {

    });
    this.inputEntry.value = "";  // clears value of input box, referenced bellow
    // scrollToBottom();
  }

  render() {
    const usernamesList = this.state.usernames.map((username, i) => {
      return (
        <li>{username}</li>
      )
    })
    const messagesList = this.state.messages.map((message, i) => {
      return (
        <div>
          <div>
            <li className="chat-user-name">{message.from}: <span className="chat-user-text">{message.text}</span></li>
          </div>
        </div>
      )
    })


    return (
      <main className="chat-holder">
        <div className="chat-div-area">
          <div class="chat__main">
            <div className="chat-feed">
              <ol id="messages" class="chat__messages"></ol>
              <ul>{messagesList}</ul>
            </div>
          </div>
        </div>
        <div class="chat__footer">
          <form onSubmit={this.handleSubmit}>
            <input type="text" name="newMessage" ref={el => this.inputEntry = el} onChange={this.handleInputChange} placeholder="Message" autofocus autocomplete="off" />
            <button>Send</button>
          </form>
          <button id="send-location" type="button" name="button">Send location</button>
        </div>
      </main>
    )
  }
}


