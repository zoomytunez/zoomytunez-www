import React from 'react';
import './IntensityCurve.css';

class IntensityCurve extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewBox: `0 0 ${props.width} ${props.height}`
    };
  }

  static defaultProps = {
    padding: 8
  }

  position({time, pace}) {
    const p = this.props.padding
    const w = this.props.width - 2 * p
    const h = this.props.height - 2 * p
    return {
      x: time/this.props.curve.duration * w + p,
      y: ((pace-4)/20) * h + p
    }
  }

  render() {
    const curve = this.props.curve
    return (
      <svg
        className="IntensityCurve"
        width={this.props.width}
        height={this.props.height}
        viewBox={this.state.viewBox}
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="0" y="0" width="100%" height="100%" className="_background"/>
        {curve.points.map((point, i) => {
          if (i === curve.points.length - 1) return null;
          const {x: x1, y: y1} = this.position(point);
          const {x: x2, y: y2} = this.position(curve.points[i + 1])
          return (
            <line
              className="_curve"
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
            />
          )
        })}
      </svg>
    );
  }
}

export default IntensityCurve
