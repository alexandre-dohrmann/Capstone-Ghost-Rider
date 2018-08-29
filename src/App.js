import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

import MainContainer from './MainContainer/MainContainer';
import { fetchCsrfTokenAction } from './actions/actions';


class App extends Component {
  componentDidMount() {
    this.props.fetchCsrfToken();
  }

  render() {
    return (
      <div className="App">
        <MainContainer />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCsrfToken: () => { fetchCsrfTokenAction(dispatch) },
  }
};

export default connect(null, mapDispatchToProps)(App);
