import React, {Component} from 'react';

export default class ProfilePic extends Component {
  render() {
    var profileImage = {
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${this.props.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat"
    }
    return (
      <div className="col-xs-12 col-sm-6 ">
        <div id="profileImage" style={profileImage}>
            <img src={`${this.props.image}`} alt=""/>
        </div>
        <div className="artistName">{this.props.name}</div>
      </div>
    );
  }
}