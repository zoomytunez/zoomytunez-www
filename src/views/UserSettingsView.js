import React from 'react';
import './UserSettingsView.css';

import Button from '../components/Button';
import HeightEntry from '../components/HeightEntry';
import {SERVICE_URL, WWW_URL, setHeight } from '../zoomy/api';

import ActionCollapser from '../util/ActionCollapser';

class UserSettingsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Math.round(this.props.height * 0.0393700787)
    };

    this.update = this.update.bind(this);
    this.publish = this.publish.bind(this);

    this.collapser = new ActionCollapser(this.publish, 500);
  }

  update(val) {
    this.setState({
      height: val,
    })
    this.collapser.push(Math.round(val))
  }

  publish(val) {
    setHeight(Math.round(val))
    this.props.publish({height: Math.round(val)})
  }

  render() {
    return (
      <div className="UserSettingsView -standard-step">
        <h2>Profile</h2>

        <HeightEntry
          onUpdate={this.update}
          initial={this.state.height}
        />

        <h2>Account</h2>

        <Button
          type="link"
          href={SERVICE_URL + "logout?from=" + encodeURIComponent(WWW_URL)}
        >Logout</Button>

        <Button
          type="link"
          weight="secondary"
          href={SERVICE_URL + "auth/forget?from=" + encodeURIComponent(WWW_URL)}
        >Delete my data</Button>

      </div>
    );
  }
}

export default UserSettingsView
