#!/bin/sh

if [ -s src/components/$1.js ]
then
  echo Component already exists\!
  exit 1
fi

echo Creating new component: $1
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
        Hello, $1!
      </div>
    );
  }
}

export default $1" > src/components/$1.js

touch src/components/$1.css
subl src/components/$1.js src/components/$1.css
subl src/components/$1.js