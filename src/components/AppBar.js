import React from 'react';
import './AppBar.css';
import Logo from './Logo';

import DEFAULT_IMAGE_URL from './AppBar/default_icon.png';

function AppBar(props) {
  return (
    <div className="AppBar">
      <Logo/>
      <button
        className="AppBar-profile -focus-ring-dark"
        onClick={props.toggleSettings}
        title="Profile and account"
      >
        <img src={props.userImage || DEFAULT_IMAGE_URL} alt="Profile"/>
      </button>
    </div>
  );
}

export default AppBar
