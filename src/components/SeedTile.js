import React from 'react';
import './SeedTile.css';

import { Icon } from '@iconify/react';
import plusCircleOutline from '@iconify/icons-mdi/plus-circle-outline';
import checkCircleOutline from '@iconify/icons-mdi/check-circle-outline';

class SeedTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  capitalize(str) {
    return str.substr(0, 1).toUpperCase() + str.substr(1)
  }

  render() {
    const d = this.props.data
    const info = {
      primary: d.name,
      type: this.capitalize(d.type === "track" ? "song" : d.type)
    }
    let imageList;
    if (d.type === "artist") {
      imageList = d.images;
    } else if (d.type === "track") {
      imageList = d.album.images;
      info.secondary = d.artists[0].name;
    }
    if (imageList.length) {
      info.imageURL = imageList[imageList.length - 1].url;
    }
    return (
      <div className="SeedTile">
        <div className="SeedTile-image">
          {info.imageURL && <img src={info.imageURL} alt="cover art"/>}
        </div>
        <div className="SeedTile-body">
          <h4 title={info.primary}>{info.primary}</h4>
          <p>{info.type}{info.secondary && " · " + info.secondary}</p>
        </div>
        <div className="SeedTile-action">
          <Icon icon={this.props.selected ? plusCircleOutline : checkCircleOutline} width={24}/>
        </div>
      </div>
    );
  }
}

export default SeedTile
