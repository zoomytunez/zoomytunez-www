import React from 'react';
import './App.css';

import Landing from './views/Landing';
import AppView from './views/AppView';

import {getUser} from "./zoomy/api";

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      ready: false,
      loggedIn: false,
      dead: false,
    }

    this.refreshUser = this.refreshUser.bind(this)
    this.quickPublish = this.quickPublish.bind(this)
    this.refreshUser()
  }

  quickPublish(properties) {
    this.setState({
      user: {
        ...this.state.user,
        ...properties
      }
    })
  }

  refreshUser() {
    getUser().then(data => {
      this.setState({
        "ready": true,
      })
      if (!data.user) {
        this.setState({
          "loggedIn": false,
        })
      } else {
        this.setState({
          "ready": true,
          "loggedIn": true,
          "user": {
            "name": data.user,
            "image": data.photo,
            "savedPlaylists": data.playlists,
            "height": data.height
          }
        })
      }
    }).catch(() => {
      this.setState({
        "dead": true,
        "ready": true,
      })
    })
  }

  render() {
    return (
      <div className="App">
        {
          //this.state.dead ? "a horrible thing happened" :
          !(this.state.ready && this.state.loggedIn) ?
            <Landing loading={!this.state.ready}/> :
          <AppView user={this.state.user} refreshUser={this.refreshUser} quickPublish={this.quickPublish}/>
        }
      </div>
    );
  }
}

export default App;
