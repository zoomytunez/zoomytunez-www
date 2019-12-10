import React from 'react';
import './AppView.css';

import UserSettingsView from './UserSettingsView';
import PlaylistListView from './PlaylistListView';
import PlaylistDetailView from './PlaylistDetailView';

import HeightSetFlow from './HeightSetFlow';
import CreatePlaylistFlow from './CreatePlaylistFlow';

import AppBar from '../components/AppBar';

class AppView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      settingsOpen: false,
      viewing: null,
    }

    this.toggleSettings = this.toggleSettings.bind(this)
    this.toList = this.toList.bind(this)
  }

  toList() {
    this.setState({
      viewing: null,
    })
  }

  toggleSettings() {
    this.setState({
      settingsOpen: !this.state.settingsOpen,
    })
  }

  render() {
    return (
      <div className="AppView">
        <AppBar toggleSettings={this.toggleSettings} userImage={this.props.user.image}/>
        <div className="AppView-container">
          {
            this.state.settingsOpen ?
              <UserSettingsView height={this.props.user.height} publish={this.props.quickPublish}/>
            : !this.props.user.height ?
              <HeightSetFlow refresh={this.props.refreshUser}/>
            : !(this.props.user.playlists && this.props.user.playlists.length) || !this.state.viewing ?
              <CreatePlaylistFlow
                refresh={this.props.refreshUser}
                close={(this.props.user.playlists && this.props.user.playlists.length) ? this.toList : null}
              />
            : this.state.viewing ?
              <PlaylistDetailView
                playlist={this.state.viewing}
                close={this.toList}
              />
            : <PlaylistListView
                view={this.viewDetail}
              />
          }
        </div>
      </div>
    )
  }
}

export default AppView;
