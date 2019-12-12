import React from 'react';
import './SeedTile.css';

import { Icon } from '@iconify/react';
import plusCircleOutline from '@iconify/icons-mdi/plus-circle-outline';
import checkCircle from '@iconify/icons-mdi/check-circle';

class SeedTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static defaultProps = {
    size: "large"
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
      <div className={"SeedTile SeedTile-" + this.props.size + " SeedTile__" + (this.props.selected ? "selected" : "unselected")}>
        <div className="SeedTile-image">
          {info.imageURL && <img src={info.imageURL} alt="cover art"/>}
        </div>
        <div className="SeedTile-body">
          <h4 title={info.primary}>{info.primary}</h4>
          {this.props.size === "large" &&
            <p>{info.type}{info.secondary && " · " + info.secondary}</p>
          }
        </div>
        {this.props.size === "large" &&
          (this.props.showBPM ?
            <div className="SeedTile-bpm">
              {Math.round(this.props.data.bpm) + " bpm"}
            </div>
          :
            <div className="SeedTile-action">
              <Icon icon={this.props.selected ? checkCircle : plusCircleOutline} width={24}/>
            </div>
          )
        }
      </div>
    );
  }
}

export default SeedTile
