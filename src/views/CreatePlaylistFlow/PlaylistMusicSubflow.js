import React from 'react';
import './PlaylistMusicSubflow.css';

import PageHeading from '../../components/PageHeading';
import Button from '../../components/Button';
import HintText from '../../components/HintText';
import Card from '../../components/Card';

import { search as spotifySearch } from '../../zoomy/api';

import ActionCollapser from '../../util/ActionCollapser';

class PlaylistMusicSubflow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      loading: true,
      results: [],
    };


    this.runSearch = this.runSearch.bind(this)
    this.updateSearch = this.updateSearch.bind(this)

    this.collapser = new ActionCollapser(this.runSearch, 750)
  }

  updateSearch(evt) {
    const search = evt.target.value
    this.setState({search})
    if (!search) {
      this.setState({results: [], loading: true})
    } else {
      this.collapser.push(search)
    }
  }

  async runSearch(search) {
    this.setState({
      loading: true,
    })
    const data = await spotifySearch(search, 5);
    if (search !== this.state.search) return;
    this.setState({
      loading: false,
    })
    const results = [...data.artists.items, ...data.tracks.items].sort((l, r) => (
      r.popularity - l.popularity
    )).splice(0, 8)
    this.setState({results})
  }

  render() {
    return (
      <div className="PlaylistMusicSubflow -standard-step -step-wide">
        <PageHeading
          heading="Choose your music"
          subhead="We’ll use your selections to create a playlist that is uniquely you, but still new. "
        />

        <Card>
          <input
            className="PlaylistMusicSubflow-searchbox -focus-ring"
            type="search"
            value={this.state.search}
            onChange={this.updateSearch}
            placeholder="Search for genres, artists, or songs"
          />

          <div className="PlaylistMusicSubflow-results-area">
            {
              this.state.search ? (
                this.state.results.length ?
                  <div className="PlaylistMusicSubflow-results-area">
                  </div>
                : (
                  this.state.loading ?
                    <div className="--placeholder _loading">
                      Loading results…
                    </div>
                  :
                    <div className="--placeholder _empty">
                      We got nothing. Try again?
                    </div>
                )
              ) :
                <div className="PlaylistMusicSubflow-results-no-search">
                </div>
            }
          </div>

        </Card>

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
            Create!
          </Button>
        </div>

        <HintText
          heading="Search for artists, songs, or genres you love"
          body="Choose up to five total. We’ll pick tracks for your new playlist based on your selections."
        />
      </div>
    );
  }
}

export default PlaylistMusicSubflow
