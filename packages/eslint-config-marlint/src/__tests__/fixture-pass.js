import React from 'react';

function a(e) {
  e.preventDefault();
}

export default class Search extends React.Component {
  requestReceived(req, res, next) {
    return true;
  }

  handleClick = e => {
    const { x, y, ...z } = e;
    this.doSomething(z, e, a);
  };

  render() {
    return (
      <div onClick={this.handleClick} tabIndex={0} role="button">
        {'children'}
        <script dangerouslySetInnerHTML={{ __html: '' }} />
      </div>
    );
  }
}
