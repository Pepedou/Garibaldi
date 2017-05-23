import React, {Component} from 'react';
import './ArtCard.css';

export default class ArtCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }

  render() {
    return (
      <div className="col-xs-12 col-sm-3 artCard" onClick={() => this.props.handleClickArtCardGrid(this.props.card)}>
        <img src={this.props.card.artImage} alt="" className="artCardImage"/>
        <p>{this.props.card.detail.artName}</p>
      </div>
    );
  }
}