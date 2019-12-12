import React from 'react';
import './IntensityCurve.css';

const PADDING = {
  tiny: {
    t: 4,
    b: 4,
    l: 4,
    r: 4,
  },
  small: {
    t: 8,
    b: 8,
    l: 8,
    r: 8,
  },
  large: {
    t: 12,
    b: 12,
    l: 64,
    r: 16,
  }
}


class IntensityCurve extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewBox: `0 0 ${props.width} ${props.height}`,
      dragging: -1
    };

    this.startDrag = this.startDrag.bind(this)
    this.stopDrag = this.stopDrag.bind(this)
    this.doDrag = this.doDrag.bind(this)
  }

  startDrag(i) {
    this.setState({
      dragging: i
    })
  }

  stopDrag() {
    this.setState({
      dragging: -1
    })
  }

  doDrag(evt) {
    if (!this.props.publish) return
    if (this.state.dragging === -1) return

    const dx = evt.movementX
    const dy = evt.movementY
    const i = this.state.dragging
    const newCurve = {...this.props.curve}
    const points = newCurve.points
    const point = points[i]
    const p = PADDING[this.props.size]

    let pace = point.pace
    pace += 20 * dy / (this.props.height - p.t - p.b)
    pace = Math.max(4, Math.min(24, pace))
    point.pace = pace

    if (i > 0 && i < points.length - 1) {
      let time = point.time
      time += newCurve.duration * dx / (this.props.width - p.l - p.r)
      time = Math.max(points[i - 1].time + 1, Math.min(points[i + 1].time - 1, time))
      point.time = time
    }

    this.props.publish(newCurve)
  }

  lerp(n, a, b) {
    return a + n * (b - a)
  }

  generateGrid() {
    const p = PADDING[this.props.size]
    const w = this.props.width
    const h = this.props.height

    const features = []
    for (let i = 0; i < 6; i++) {
      const y = this.lerp(i/5, p.t, h - p.b)
      features.push(
        <line
          key={'v'+i}
          className="_gridLine_left"
          x1={p.l}
          x2={w - p.r}
          y1={y}
          y2={y}
        />
      )
      features.push(
        <text
          key={'tv'+i}
          className="_gridLabel_left"
          x={p.l - 8}
          y={y}
        >
          {4 + 4 * i}{":00/mi"}
        </text>
      )
    }
    for (let i = 0; i < 5; i++) {
      const x = this.lerp(i/4, p.l, w - p.r)
      features.push(
        <line
          key={i}
          className="_gridLine_vertical"
          x1={x}
          x2={x}
          y1={p.t}
          y2={h - p.b}
        />
      )
    }

    return (
      <g className="_grid">
        {features}
      </g>
    )
  }

  generateHandles() {
    return (
      <g className="_handles">
        {this.props.curve.points.map((point, i) => {
          // if (i === this.state.dragging) return null;
          const {x, y} = this.position(point)
          let className = "_point_handle"
          if (point.time === 0 || point.time === this.props.curve.duration) {
            className += " -move-only-vertical"
          }
          return (
            <circle
              key={i}
              className={className}
              cx={x}
              cy={y}
              r={6}
              onMouseDown={evt => this.startDrag(i)}
            />
          )
        })}
      </g>
    )
  }

  dragPoint(i, evt) {
    console.log(evt)
  }

  position({time, pace}) {
    const p = PADDING[this.props.size]
    const w = this.props.width - p.l - p.r
    const h = this.props.height - p.t - p.b
    return {
      x: time/this.props.curve.duration * w + p.l,
      y: ((pace-4)/20) * h + p.t
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
        onMouseMove={this.doDrag}
        onMouseUp={this.stopDrag}
        onMouseLeave={this.stopDrag}
      >
        <rect x="0" y="0" width="100%" height="100%" className="_background"/>
        {this.props.showGrid &&
          this.generateGrid()
        }
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
        {this.props.publish &&
          this.generateHandles()
        }
      </svg>
    );
  }
}

export default IntensityCurve
