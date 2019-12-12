import React from 'react';
import './PlaylistReviewSubflow.css';

import { InlineIcon } from '@iconify/react';
import pencilIcon from '@iconify/icons-mdi/pencil';

import Button from '../../components/Button';
import Card from '../../components/Card';
import IntensityCard from '../../components/IntensityCard';
import SeedTile from '../../components/SeedTile';

import {renamePlaylist} from '../../zoomy/api';
import bpm from '../../zoomy/bpm';

class PlaylistReviewSubflow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistName: props.data.name,
      editingName: false
    };

    this.checkCommitName = this.checkCommitName.bind(this)
    this.inputName = this.inputName.bind(this)
    this.toggleUpdateName = this.toggleUpdateName.bind(this)
    this.inputRef = this.inputRef.bind(this)
  }

  checkCommitName(evt) {
    if (evt.key === "Enter") {
      this.toggleUpdateName()
    }
  }

  inputName(evt) {
    this.setState({
      playlistName: evt.target.value
    })
  }

  toggleUpdateName() {
    const editing = this.state.editingName
    if (editing) {
      renamePlaylist(this.props.data.id, this.state.playlistName)
    }
    this.setState({
      editingName: !editing
    })
  }

  inputRef(node) {
    node && node.focus();
  }

  render() {
    const curve = {}
    curve.points = []
    let timeTotal = 0
    this.props.data.tracks.forEach(track => {
      curve.points.push({
        time: timeTotal,
        pace: bpm.inverse({height: this.props.height, bpm: track.bpm})
      })
      timeTotal += track.duration_ms
      curve.points.push({
        time: timeTotal,
        pace: bpm.inverse({height: this.props.height, bpm: track.bpm})
      })

    })
    curve.duration = timeTotal

    return (
      <div className="PlaylistReviewSubflow -standard-step -step-extra-wide">
        <div className="PlaylistReviewSubflow-2col">
          <div className="PlaylistReviewSubflow-meta">
            <IntensityCard
              curve={curve}
              size="tiny"
            />
            <h2>{this.state.editingName ?
                <input
                  type="text"
                  className="-focus-ring"
                  value={this.state.playlistName}
                  onChange={this.inputName}
                  onKeyDown={this.checkCommitName}
                  ref={this.inputRef}
                />
              :
                this.state.playlistName
              }
              <button className="-invisible-button -focus-ring" onClick={this.toggleUpdateName}>
                <InlineIcon icon={pencilIcon}/>
              </button>
            </h2>
            <p>{this.props.data.tracks.length} songs · {
              Math.round(timeTotal / 1000 / 60)
            } minutes</p>

            <Button
              type="link"
              href={this.props.data.uri}
              target="_blank"
            >
              Open in Spotify
            </Button>
            <Button
              onClick={this.props.retry}
              weight="secondary"
            >
              Try again
            </Button>

          </div>
          <div className="PlaylistReviewSubflow-playlist">
            <Card>
              <ul>
                {
                  this.props.data.tracks.map((result, i) =>
                    <li key={result.uri}>
                      <SeedTile
                        data={result}
                        showBPM={true}
                      />
                    </li>
                  )
                }
              </ul>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default PlaylistReviewSubflow
