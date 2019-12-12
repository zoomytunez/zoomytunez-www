import React from 'react';
import './PlaylistReviewSubflow.css';

import { InlineIcon } from '@iconify/react';
import pencilIcon from '@iconify/icons-mdi/pencil';

import Button from '../../components/Button';
import Card from '../../components/Card';
import IntensityCard from '../../components/IntensityCard';
import SeedTile from '../../components/SeedTile';

class PlaylistReviewSubflow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistName: "ZoomyTunez Playlist",
      editingName: false
    };

    this.checkCommitName = this.checkCommitName.bind(this)
    this.inputName = this.inputName.bind(this)
    this.toggleUpdateName = this.toggleUpdateName.bind(this)

  }

  checkCommitName(evt) {

  }

  inputName(evt) {
    this.setState({
      playlistName: evt.target.value
    })
  }

  toggleUpdateName() {
    const editing = this.state.editingName
    if (editing) {
      // make name change request
    }
    this.setState({
      editingName: !editing
    })
  }


  render() {
    return (
      <div className="PlaylistReviewSubflow -standard-step -step-extra-wide">
        <div className="PlaylistReviewSubflow-2col">
          <div className="PlaylistReviewSubflow-meta">
            <IntensityCard
              curve={this.props.curve}
              size="tiny"
            />
            <h2>{this.state.editingName ?
                <input
                  type="text"
                  value={this.state.playlistName}
                  onInput={this.inputName}
                  onKeydown={this.checkCommitName}
                />
              :
                this.state.playlistName
              }
              <button class="-invisible-button -focus-ring" click={this.toggleUpdateName}>
                <InlineIcon icon={pencilIcon}/>
              </button>
            </h2>
            <p>{this.props.data.tracks.length} songs · {
              Math.round(this.props.data.tracks.reduce((l, r) => l + r.duration_ms, 0) / 1000 / 60)
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
