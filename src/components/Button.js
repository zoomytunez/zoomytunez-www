import React from 'react';
import './Button.css';

function Button(props) {
  let className = "Button"
  if (props.theme) {
    className += " Button-" + props.theme
  }
  if (props.weight === "secondary") {
    className += " Button-secondary"
  }

  return (props.type === "link") ? (
      <a onClick={props.onClick} className={className} disabled={props.disabled} href={props.href}>
        {props.children}
      </a>
    ) : (
      <button onClick={props.onClick} className={className} disabled={props.disabled}>
        {props.children}
      </button>
    );
}

export default Button;
