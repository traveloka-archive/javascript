import React from 'react';

export default class Search extends React.Component {
  handleClick = e => {
    this.doSomething(e);
  }

  render() {
    return (
      <div onClick={this.handleClick} tabIndex={0} role='button'>
        {'children'}
      </div>
    );
  }
}
