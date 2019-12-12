import React from 'react';
import './PlaylistTemplateSubflow.css';

import PageHeading from '../../components/PageHeading';
import Button from '../../components/Button';
import IntensityCard from '../../components/IntensityCard';


const TEMPLATES = [
  {
    title: "Flat",
    curve: {
      points: [
        {
          time: 0,
          pace: 12
        },
        {
          time: 1,
          pace: 12
        }
      ]
    }
  },
  {
    title: "Build up",
    curve: {
      points: [
        {
          time: 0,
          pace: 16
        },
        {
          time: 1,
          pace: 8
        }
      ]
    }
  },
  {
    title: "Mountain",
    curve: {
      points: [
        {
          time: 0,
          pace: 16
        },
        {
          time: 0.5,
          pace: 8
        },
        {
          time: 1,
          pace: 16
        }
      ]
    }
  }
]

class PlaylistTemplateSubflow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
    };
  }

  set(i) {
    this.setState({
      selected: i
    })
    this.props.publish({
      duration: this.props.duration * 60,
      points: TEMPLATES[i].curve.points.map(point => ({
        pace: point.pace,
        time: point.time * this.props.duration * 60
      }))
    })
  }

  componentDidMount() {
    if (!this.props.curve) {
      this.set(0)
    }
  }

  render() {
    return (
      <div className="PlaylistTemplateSubflow -standard-step -step-extra-wide">
        <PageHeading
          heading="Choose a starting point"
          subhead="You’ll be able to fine tune the intensity next!"
        />

        <div className="PlaylistTemplateSubflow-card-grid">
          {
            TEMPLATES.map((template, i) =>
              <button
                onClick={_=>this.set(i)}
                className="-invisible-button -focus-ring"
                key={template.title}
              >
                <IntensityCard
                  selected={this.state.selected === i}
                  title={template.title}
                  curve={{
                    duration: 1,
                    points: template.curve.points
                  }}
                />
              </button>
            )
          }
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

      </div>
    );
  }
}

export default PlaylistTemplateSubflow
