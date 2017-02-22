import React, {Component} from 'react';

export default class ProfilePic extends React {
  render() {
    return (
      <div className="col-xs-12 col-sm-6 profileImage" style={`backgroung-image: url($this.props.image)`}>
        <div className="artistName">this.props.name</div>
      </div>
    );
  }
}