import React from 'react';
import './HeightSetFlow.css';

import PageHeading from '../components/PageHeading';
import HeightEntry from '../components/HeightEntry';
import HintText from '../components/HintText';
import Button from '../components/Button';

import { setHeight } from '../zoomy/api';

class HeightSetFlow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      saving: false,
    };

    this.update = this.update.bind(this)
    this.commit = this.commit.bind(this)
  }

  update(val) {
    this.setState({
      height: val,
    })
  }

  commit() {
    this.setState({
      saving: true
    })
    setHeight(Math.round(this.state.height))
      .then(this.props.refresh)
  }

  render() {
    return (
      <div className="HeightSetFlow -standard-step">
        <PageHeading
          heading="Let’s get to know each other"
          subhead="Help us create playlists tailored just for you."
        />

        <HeightEntry
          onUpdate={this.update}
        />

        <Button
          onClick={this.commit}
          disabled={this.state.saving}>
          Continue
        </Button>

        <HintText
          heading="Why ask for height?"
          body="This helps us calculate stride length. By knowing your height, we are able to create playlists with song arrangements that more closely match your running pace."
        />
      </div>
    );
  }
}

export default HeightSetFlow
