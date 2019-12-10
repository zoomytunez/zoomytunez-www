#!/bin/sh

if [ -s src/views/$1.js ]
then
  echo View already exists\!
  exit 1
fi

echo Creating new view: $1
echo "import React from 'react';
import './$1.css';

class $1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className=\"$1\">

      </div>
    );
  }
}

export default $1" > src/views/$1.js

touch src/views/$1.css
subl src/views/$1.js src/views/$1.css
subl src/views/$1.js