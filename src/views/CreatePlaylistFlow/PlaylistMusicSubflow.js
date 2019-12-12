import React from 'react';
import './PlaylistMusicSubflow.css';

import PageHeading from '../../components/PageHeading';
import Button from '../../components/Button';
import SeedTile from '../../components/SeedTile';
import HintText from '../../components/HintText';
import Card from '../../components/Card';

import { search as spotifySearch } from '../../zoomy/api';

import ActionCollapser from '../../util/ActionCollapser';

import { Icon } from '@iconify/react';
import minusCircleOutline from '@iconify/icons-mdi/minus-circle-outline';

class PlaylistMusicSubflow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      loading: true,
      results: [],
      selected: [],
    };

    this.runSearch = this.runSearch.bind(this)
    this.updateSearch = this.updateSearch.bind(this)
    this.checkSelection = this.checkSelection.bind(this)
    this.addToSelection = this.addToSelection.bind(this)
    this.removeFromSelection = this.removeFromSelection.bind(this)
    this.continue = this.continue.bind(this)

    this.collapser = new ActionCollapser(this.runSearch, 750)
  }

  continue() {
    this.props.continue({
      tracks: this.state.selected.filter(item=>item.type==="track").map(item=>item.id),
      artists: this.state.selected.filter(item=>item.type==="artist").map(item=>item.id),
      genres: []
    })
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

  checkSelection(data) {
    return this.state.selected.some(check => check.uri === data.uri)
  }

  addToSelection(data) {
    return () => {
      if (!this.checkSelection(data) && this.state.selected.length < 5) {
        this.setState({
          selected: [...this.state.selected, data]
        })
      }
    }
  }

  removeFromSelection(i) {
    return () => {
      this.setState({
        selected: this.state.selected.filter((_, j) => i !== j)
      })
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
      <div className="PlaylistMusicSubflow -standard-step">
        <PageHeading
          heading="Choose your music"
          subhead="We’ll use your selections to create a playlist that is uniquely you, but still new. "
        />

        <HintText
          heading="Search for artists and songs you love"
          body="Choose up to five total. We’ll pick tracks for your new playlist based on your selections."
        />

        <Card>
          <input
            className="PlaylistMusicSubflow-searchbox -focus-ring"
            type="search"
            value={this.state.search}
            onChange={this.updateSearch}
            placeholder="Search for artists or songs"
          />

          <div className="PlaylistMusicSubflow-results-area">
            {
              this.state.search ? (
                this.state.results.length ?
                  <ul className="PlaylistMusicSubflow-results">
                    {
                      this.state.results.map((result, i) =>
                        <li key={result.uri}>
                          <button
                            onClick={this.addToSelection(result)}
                            className="-invisible-button -focus-ring"
                          >
                            <SeedTile
                              data={result}
                              selected={this.checkSelection(result)}
                            />
                          </button>
                        </li>
                      )
                    }
                  </ul>
                : (
                  this.state.loading ?
                    <div className="--placeholder _loading">
                      Loading results…
                    </div>
                  :
                    <div className="--placeholder _empty">
                      We got nothing. Try something else?
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
            onClick={this.continue}
            disabled={!this.state.selected.length}>
            Create!
          </Button>
        </div>

        <div className={"PlaylistMusicSubflow-selected" + (this.state.selected.length ? " -visible" : "")}>
          {this.state.selected.map((result, i) =>
            <button
              key={result.uri}
              onClick={this.removeFromSelection(i)}
              className="-invisible-button -focus-ring"
            >
              <SeedTile
                size="small"
                data={result}
                selected={this.checkSelection(result)}
              />
              <div className="PlaylistMusicSubflow-selection-fake-remove" role="presentation">
                <Icon icon={minusCircleOutline} width={16}/>
              </div>
            </button>
          )}
        </div>

      </div>
    );
  }
}

export default PlaylistMusicSubflow
