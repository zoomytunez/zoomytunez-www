import React from 'react';
import './CreatePlaylistFlow.css';

import PlaylistDurationSubflow from './CreatePlaylistFlow/PlaylistDurationSubflow';
import PlaylistTemplateSubflow from './CreatePlaylistFlow/PlaylistTemplateSubflow';
import PlaylistCustomizeSubflow from './CreatePlaylistFlow/PlaylistCustomizeSubflow';
import PlaylistMusicSubflow from './CreatePlaylistFlow/PlaylistMusicSubflow';
import PlaylistLoadingSubflow from './CreatePlaylistFlow/PlaylistLoadingSubflow';
import PlaylistReviewSubflow from './CreatePlaylistFlow/PlaylistReviewSubflow';

class CreatePlaylistFlow extends React.Component {
  constructor(props) {
    super(props);

    // 0: duration
    // 1: template
    // 2: customize
    // 3: music
    // 4: loading
    // 5: review

    this.state = {
      step: 1,
      duration: 30,
    };

    this.setDuration = this.setDuration.bind(this);
    this.setCurve = this.setCurve.bind(this);
    this.previousStep = this.previousStep.bind(this);
    this.nextStep = this.nextStep.bind(this);
  }

  previousStep() {
    this.setState({
      step: this.state.step - 1,
    })
  }

  nextStep() {
    this.setState({
      step: this.state.step + 1,
    })
  }

  setDuration({target: {value}}) {
    this.setState({
      duration: value === "" ? "" : Math.min(120, Math.max(0, (parseInt(value)+0||30)))
    })
  }

  setCurve(curve) {
    this.setState({
      curve: curve
    })
  }

  render() {
    return (
      <div className="CreatePlaylistFlow">
        {

        this.state.step === 0 ?
          <PlaylistDurationSubflow
            duration={this.state.duration}
            publish={this.setDuration}
            continue={(this.state.duration && this.state.duration >= 10) ? this.nextStep : null}
          />
        : this.state.step === 1 ?
          <PlaylistTemplateSubflow
            duration={this.state.duration}
            curve={this.state.curve}
            publish={this.setCurve}
            back={this.previousStep}
            continue={this.nextStep}
          />
        : this.state.step === 2 ?
          <PlaylistCustomizeSubflow
          />
        : this.state.step === 3 ?
          <PlaylistMusicSubflow
          />
        : this.state.step === 4 ?
          <PlaylistLoadingSubflow
          />
        : /* this.state.step === 5 */
          <PlaylistReviewSubflow
          />
        }
      </div>
    );
  }
}

export default CreatePlaylistFlow
