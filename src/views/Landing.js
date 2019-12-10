import React from 'react';
import './Landing.css';
import Logo from '../components/Logo';
import Button from '../components/Button';

import {SERVICE_URL, WWW_URL} from '../zoomy/api';

function Landing(props) {
  return (
    <div className="Landing">
      <Logo/>
      <div className="Landing-center">
        <h2>
          Run with the rhythm
        </h2>
        <p>
          We’ll create the perfect playlist for your next run.
        </p>
        <Button
          type="link"
          disabled={props.loading}
          href={SERVICE_URL + "auth/login/spotify?from=" + encodeURIComponent(WWW_URL)}
        >{props.loading ? "Loading…" : "Login with Spotify"}</Button>
      </div>
      <div className="Landing-background" role="presentation"/>
    </div>
  );
}

export default Landing;
