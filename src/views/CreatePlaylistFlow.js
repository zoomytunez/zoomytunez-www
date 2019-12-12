import React from 'react';
import './CreatePlaylistFlow.css';

import PlaylistDurationSubflow from './CreatePlaylistFlow/PlaylistDurationSubflow';
import PlaylistTemplateSubflow from './CreatePlaylistFlow/PlaylistTemplateSubflow';
import PlaylistCustomizeSubflow from './CreatePlaylistFlow/PlaylistCustomizeSubflow';
import PlaylistMusicSubflow from './CreatePlaylistFlow/PlaylistMusicSubflow';
import PlaylistLoadingSubflow from './CreatePlaylistFlow/PlaylistLoadingSubflow';
import PlaylistReviewSubflow from './CreatePlaylistFlow/PlaylistReviewSubflow';
import Button from '../components/Button';

import bpm from '../zoomy/bpm';
import {createPlaylist as zoomyCreatePlaylist} from '../zoomy/api';

const POINT_STEP_CHUNK_SIZE = 2 * 60

class CreatePlaylistFlow extends React.Component {
  constructor(props) {
    super(props);

    // 0: duration
    // 1: template
    // 2: customize
    // 3: music
    // 4: loading
    // 5: review
    // 6: error

    this.state = {
      step: 0,
      duration: 30,
      curve: null
    };

    this.setDuration = this.setDuration.bind(this);
    this.setCurve = this.setCurve.bind(this);
    this.previousStep = this.previousStep.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.commitMusic = this.commitMusic.bind(this);
    this.createPlaylist = this.createPlaylist.bind(this);
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

  commitMusic(seeds) {
    // switch to next page
    this.setState({
      step: 4
    })

    const curve = {
      duration: this.state.curve.duration,
      points: []
    }
    const {points} = curve
    this.state.curve.points.forEach((point, i) => {
      if (i === this.state.curve.points.length - 1) return;

      let nextPoint = this.state.curve.points[i + 1]

      let startTime = point.time
      let currentTime = startTime
      let endTime = nextPoint.time

      while (currentTime < endTime) {
        let start = currentTime
        let end = Math.min(endTime, start + POINT_STEP_CHUNK_SIZE)
        let midpoint = (start + end) / 2
        let norm = (midpoint - startTime) / (endTime - startTime)
        let pace = norm * (nextPoint.pace - point.pace) + point.pace
        points.push({
          start,
          end,
          bpm: bpm({height: this.props.height, pace})
        })
        currentTime = end
      }
    })

    const data = {
      seeds,
      curve
    }

    this.setState({playlistCreateData: data}, this.createPlaylist)
  }

  async createPlaylist() {
    this.setState({
      step: 4
    })
    try {
      const result = await zoomyCreatePlaylist(this.state.playlistCreateData);
      if (result.error) {
        throw new Error(result.error)
      }
      this.setState({
        step: 5,
        playlistData: result
      })
    } catch (e) {
      this.setState({
        step: 6
      })
    }
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
            duration={this.state.duration}
            curve={this.state.curve}
            publish={this.setCurve}
            back={this.previousStep}
            continue={this.nextStep}
          />
        : this.state.step === 3 ?
          <PlaylistMusicSubflow
            back={this.previousStep}
            continue={this.commitMusic}
          />
        : this.state.step === 4 ?
          <PlaylistLoadingSubflow
          />
        : this.state.step === 5 ?
          <PlaylistReviewSubflow
            retry={this.createPlaylist}
            data={this.state.playlistData}
            curve={this.state.curve}
          />
        : /* this.state.step === 6 */
          <div>
            <h2>An error occured.</h2>
            <Button
              onClick={() => {
                this.setState({
                  step: 2,
                })
              }}
            >Try again</Button>
          </div>
        }
      </div>
    );
  }
}

export default CreatePlaylistFlow
