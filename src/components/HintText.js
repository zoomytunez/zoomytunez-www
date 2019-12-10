import React from 'react';
import './HintText.css';

function  HintText(props) {
  return (
    <div className="HintText">
      <h3>{props.heading}</h3>
      <p>{props.body}</p>
    </div>
  );
}

export default HintText
