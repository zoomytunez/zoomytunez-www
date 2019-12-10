import React from 'react';
import './IntensityCard.css';

import Card from './Card';
import IntensityCurve from './IntensityCurve';

class IntensityCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let className = "IntensityCard"
    if (this.props.selected) {
      className += " IntensityCard-selected"
    }
    return (
      <div className={className}>
        <Card title={this.props.title}>
          <IntensityCurve width={320} height={160} curve={this.props.curve} />
        </Card>
      </div>
    );
  }
}

export default IntensityCard
