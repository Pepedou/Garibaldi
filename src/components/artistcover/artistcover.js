import React, {Component} from 'react';
import ProfilePic from '../profilepic/profilepic';
import Profile from '../profile/profile';
import './artistcover.css';

export default class ArtistCover extends Component {
  render() {
    return (
      <div className="col-xs-12 col-sm-12">
        <ProfilePic image={this.props.artist.image} name={this.props.artist.name}/>
        <Profile description={this.props.artist.description}/>
      </div>
    );
  }
}