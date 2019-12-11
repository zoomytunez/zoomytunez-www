import React from 'react';
import './PlaylistReviewSubflow.css';

import Button from '../../components/Button';

class PlaylistReviewSubflow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="PlaylistReviewSubflow -standard-step -step-extra-wide">
        [Review]


          <Button
            onClick={this.props.back}
            weight="secondary"
          >
            Try again
          </Button>
      </div>
    );
  }
}

export default PlaylistReviewSubflow
