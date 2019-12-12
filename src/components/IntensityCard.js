import React from 'react';
import './IntensityCard.css';

import Card from './Card';
import IntensityCurve from './IntensityCurve';


const SIZES = {
  "tiny": {
    w: 240,
    h: 128
  },
  "small": {
    w: 320,
    h: 160,
  },
  "large": {
    w: 544,
    h: 384,
  }
}

class IntensityCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static defaultProps = {
    size: "small"
  }

  render() {
    let className = "IntensityCard"
    if (this.props.selected) {
      className += " IntensityCard-selected"
    }
    className += " IntensityCard-" + this.props.size
    return (
      <div className={className}>
        <Card title={this.props.title}>
          <IntensityCurve
            size={this.props.size}
            width={SIZES[this.props.size].w}
            height={SIZES[this.props.size].h}
            curve={this.props.curve}
            publish={this.props.publish}
            showGrid={this.props.showGrid}
          />
        </Card>
      </div>
    );
  }
}

export default IntensityCard
