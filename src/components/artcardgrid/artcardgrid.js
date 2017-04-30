import React, {Component} from 'react';
import ArtCard from '../ArtCard/ArtCard';

export default class ArtCardGrid extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeCard: 0
    };
  }

  buildArtCards() {
    return this.props.cards.map((card, index) => {
        return <ArtCard key={index} card={card} handleClickArtCardGrid={this.props.handleClickArtCardGrid}/>
      });
  };

  render() {
    const cards = this.buildArtCards();
    return (
      <div className="row">
        {cards}
      </div>
    );
  }
}