import React, { Component } from 'react';
import './App.css';

import MainContainer from './MainContainer/MainContainer';


class App extends Component {
  constructor() {
    super();
    this.state = {
      csrf_token: ''
    };
  }

  getToken = async () => {
    const token = await fetch('https://ghostrider-react-django-python.herokuapp.com/api/get_csrf/', {
      credentials: 'include'
    })
    const parsedToken = await token.json()
    console.log(parsedToken, 'parsed token #####');
    return parsedToken.token

  }


  componentDidMount() {
    this.getToken().then((token) => {
      this.setState({
        csrf_token: token
      })
    })
  }

  render() {
    return (
      <div className="App">
        <MainContainer csrf_token={this.state.csrf_token}>

        </MainContainer>
      </div>
    );
  }
}

export default App;
