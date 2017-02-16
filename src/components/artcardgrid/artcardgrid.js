import React, { Component } from 'react';
import ArtCard from '../artcard/artcard';

class ArtCardGrid extends Component {

  constructor(props) {
      super(props);
      this.state = {
        activeCard: 0
        };
  }

  buildArtCards(){
    return this.props.cards.map((card, index) => {
        return <ArtCard key={index} imageUrl={card.imageUrl} detail={card.detail} />
     });
  };
    
  render(){
    const cards = this.buildArtCards();
    return (
      <div className="row">
          { cards }
      </div>
    );
  }
}

// static propTypes = {
//     cards: React.PropTypes.array.isRequired,
//     cardsPerRow: React.PropTypes.number.isRequired
//   };

export default ArtCardGrid;
