import React from 'react';

function a(e) {
  e.preventDefault();
}

export default class Search extends React.Component {
  handleClick = e => {
    this.doSomething(e, a);
  }

  render() {
    return (
      <div onClick={this.handleClick} tabIndex={0} role='button'>
        {'children'}
      </div>
    );
  }
}
