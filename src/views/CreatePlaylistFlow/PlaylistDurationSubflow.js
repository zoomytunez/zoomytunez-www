import React from 'react';
import './PlaylistDurationSubflow.css';
import PageHeading from '../../components/PageHeading';
import Button from '../../components/Button';
import Card from '../../components/Card';
import HintText from '../../components/HintText';

class PlaylistDurationSubflow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="PlaylistDurationSubflow -standard-step">
        <PageHeading
          heading="How long do you want to run?"
          subhead="We’ll create a playlist that matches your run time."
        />

        <Card
          title="Run length"
        >
          <div className="-giant-input-card">
            <label>
              <input
                className="-focus-ring"
                type="number"
                placehodler="30"
                max="120"
                min="10"
                step="5"
                value={this.props.duration}
                onChange={this.props.publish}
                style={{width:"2.5em"}}
              />
              min
            </label>
          </div>
        </Card>
        <div className="step-button-group">
          {this.props.back &&
            <Button
              onClick={this.props.back}
              weight="secondary"
            >
              Back
            </Button>
          }
          <Button
            onClick={this.props.continue}
            disabled={this.props.continue === null}>
            Next
          </Button>
        </div>
        <HintText
          heading="Help us design a playlist of the right length"
          body="We want to make your workout the best it can be. We’ll try to fit the best songs for you into this time."
        />
      </div>
    );
  }
}

export default PlaylistDurationSubflow
