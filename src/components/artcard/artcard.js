import React, { Component } from 'react';
import './artcard.css';

class ArtCard extends Component {
  constructor(props){
    super(props);
    this.state = {
        active: false
    };
  }

  render(){
    return (
      <div className="col-xs-12 col-sm-3 artCard">
        <img src={this.props.imageUrl} alt="" className="artCardImage"/>
        <p>{this.props.detail.name}</p>
      </div>
    );
  }
}

//  static propTypes = {
//     imageUrl: React.PropTypes.string.isRequired,
//     detail: React.PropTypes.object.isRequired
//   };

export default ArtCard;