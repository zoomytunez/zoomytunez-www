import React from 'react';
import './PlaylistLoadingSubflow.css';
import loadicon from './loadicon.svg';

class PlaylistLoadingSubflow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="PlaylistLoadingSubflow -standard-step">
        <img src={loadicon} alt="loading"/>
        <h2>Ready, set…</h2>
        <p>(We’re building the perfect playlist for you)</p>
      </div>
    );
  }
}

export default PlaylistLoadingSubflow
