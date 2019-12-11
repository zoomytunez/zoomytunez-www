import React from 'react';
import './PlaylistCustomizeSubflow.css';

import PageHeading from '../../components/PageHeading';
import Button from '../../components/Button';
import IntensityCard from '../../components/IntensityCard';
import HintText from '../../components/HintText';

class PlaylistCustomizeSubflow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="PlaylistCustomizeSubflow -standard-step">
        <PageHeading
          heading="Customize your run"
          subhead="Choose your desired pacing for your workout."
        />

        <div className="-wider-step-contents">
          <IntensityCard
            curve={this.props.curve}
            size="large"
            publish={this.props.publish}
            showGrid={true}
          />
        </div>

        <div className="step-button-group">
          <Button
            onClick={this.props.back}
            weight="secondary"
          >
            Back
          </Button>
          <Button
            onClick={this.props.continue}
            disabled={this.props.continue === null}>
            Next
          </Button>
        </div>
        <HintText
          heading="Drag the points above to customize your run intensity"
          body="Move points vertically to change the target pace, and horizontally to adjust the timing of your run."
        />
      </div>
    );
  }
}

export default PlaylistCustomizeSubflow
