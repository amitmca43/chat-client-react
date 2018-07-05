import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { connect } from 'react-redux';
import { defaultFunction } from './actions';

import ChatUsers from './components/chat-users';
import ChatGroups from './components/chat-groups';
import chatMessages from './components/chat-messages';
import Chat from './components/chat';

class App extends Component {

  componentDidMount() {
    // call default function to display redux operation
    this.props.defaultFunction();
  }

  render() {
    return (
      <div>
        <ChatUsers />
        <ChatGroups />
        <ChatMessages />
        <Chat />
      </div>
    );
  }
}

// function to convert the global state obtained from redux to local props
function mapStateToProps(state) {
  return {
    default: state.default
  };
}

export default connect(mapStateToProps, { defaultFunction })(App);
