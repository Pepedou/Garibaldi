import React, {Component} from 'react';

export default class ArtistCover extends React {
  render() {
    return (
      <div className="col-xs-12 col-sm-12">
        <ProfilePic image={this.props.artist.image} name={this.props.artist.name}/>
        <Profile description={this.props.artist.description}/>
      </div>
    );
  }
}