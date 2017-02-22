import React, {Component} from 'react';

export default class ProfilePic extends Component {
  render() {
    var profileImage = {
        backgroundImage: `url(${this.props.image})`
    }
    return (
      <div className="col-xs-12 col-sm-6 profileImage" style={profileImage}>
        <div className="artistName">{this.props.name}</div>
      </div>
    );
  }
}