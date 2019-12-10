import React from 'react';
import './PageHeading.css';

class PageHeading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="PageHeading">
        <h2>{this.props.heading}</h2>
        <p>{this.props.subhead}</p>
      </div>
    );
  }
}

export default PageHeading
