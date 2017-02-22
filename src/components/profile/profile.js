import React, {Component} from 'react';

export default class Profile extends React {
  render() {
    return (
      <div className="col-xs-12 col-sm-6">
        <div className="artistDescription">this.props.description</div>
      </div>
    );
  }
}