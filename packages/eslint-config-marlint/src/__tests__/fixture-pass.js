import React from 'react';

export default class Search extends React.Component {
  handleClick = e => {
    // Empty function with comment is allowed
  }

  render() {
    return (
      <div onClick={this.handleClick} tabIndex={0} role='button'>
        {'children'}
      </div>
    );
  }
}
