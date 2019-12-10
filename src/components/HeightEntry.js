import React from 'react';
import './HeightEntry.css';

import Card from './Card';

class HeightEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ftValue: props.initial ? Math.floor(props.initial / 12) : "",
      inValue: props.initial ? props.initial % 12 : ""
    }

    this.setFeet = this.setFeet.bind(this);
    this.setInches = this.setInches.bind(this);
  }

  format(value, min, max) {
    return Math.floor(Math.max(min, Math.min(max, value)))
  }

  publish(inches) {
    if (this.props.onUpdate) {
      this.props.onUpdate(25.4 * inches) // inches to mm
    }
  }

  setFeet(evt) {
    let ft = this.format(parseInt(evt.target.value) || 0, 0, 10)
    this.publish(ft * 12 + this.state.inValue)
    this.setState({
      ftValue: ft || "",
    })
  }

  setInches(evt) {
    let inches = evt.target.value
    let ft = this.state.ftValue
    if (evt.target.value !== "") {
      inches = parseInt(inches) || 0;

      while (inches >= 12) {
        ft++;
        inches -= 12;
      }
      while (inches < 0) {
        ft--;
        inches += 12;
      }

      inches = this.format(inches, 0, 11);
      ft = this.format(ft, 0, 10);
    }

    this.publish(+(ft * 12 + inches));

    this.setState({
      ftValue: ft,
      inValue: ""+inches,
    })
  }

  render() {
    return (
      <div className="HeightEntry">
        <Card>
          <div className="HeightEntry-hint">
            Height
          </div>
          <div className="HeightEntry-area">
            <label>
              <input
                className="-focus-ring"
                type="number"
                max="8"
                min="1"
                value={this.state.ftValue}
                onChange={this.setFeet}
              />
              ft
            </label>
            <label>
              <input
                className="-focus-ring"
                type="number"
                max="12"
                min="-1"
                value={this.state.inValue}
                onChange={this.setInches}
              />
              in
            </label>
          </div>
        </Card>
      </div>
    );
  }
}

export default HeightEntry
