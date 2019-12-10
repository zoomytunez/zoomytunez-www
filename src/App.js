import React from 'react';
import './App.css';

import Landing from './views/Landing';

import {getUser} from "./zoomy/api";

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      ready: false,
      loggedIn: false
    }

    getUser().then(() => {
      this.setState({
        "ready": true,
        "loggedIn": true,
      })
    }).catch(() => {
      this.setState({
        "ready": true,
        "loggedIn": false,
      })
    })

  }

  render() {
    return (
      <div className="App">
        {(this.state.ready && this.state.loggedIn) ||
          <Landing loading={!this.state.ready}/>}
        you are logged in
      </div>
    );
  }
}

export default App;
