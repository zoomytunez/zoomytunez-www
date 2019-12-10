import React from 'react';
import './Card.css';

function Card(props) {
  return (
    <div className="Card">
      {props.title &&
        <div className="Card-title">
          {props.title}
        </div>
      }
      {props.children}
    </div>
  );
}

export default Card
