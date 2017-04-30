import React, {Component} from 'react';
import ArtCardGrid from '../ArtCardGrid/ArtCardGrid';

export default class Mosaic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: ""
    };
  }

  render() {
    return (
      <div className="col-xs-12 Mosaic">
        <ArtCardGrid cards={this.props.cards} cardsPerRow={4} handleClickArtCardGrid={this.props.handleClickArtCardGrid}/>
      </div>
    );
  }
}