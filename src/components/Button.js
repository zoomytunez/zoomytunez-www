import React from 'react';
import './Button.css';

function Button(props) {
  return (props.type === "link") ? (
      <a className="Button" disabled={props.disabled} href={props.href}>
        {props.children}
      </a>
    ) : (
      <button className="Button" disabled={props.disabled}>
        {props.children}
      </button>
    );
}

export default Button;
