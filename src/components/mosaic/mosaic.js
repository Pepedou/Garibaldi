import React, {Component} from 'react';
import ArtCardGrid from '../ArtCardGrid/artcardgrid';
import SearchBox from '../SearchBox/searchbox';

export default class Mosaic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [
        {
          imageUrl: "https://s-media-cache-ak0.pinimg.com/736x/8d/6c/b3/8d6cb3ca992d0e03a73d78a349f36" +
              "267.jpg",
          detail: {
            name: "Art 1"
          }
        }, {
          imageUrl: "https://s-media-cache-ak0.pinimg.com/736x/8d/6c/b3/8d6cb3ca992d0e03a73d78a349f36" +
              "267.jpg",
          detail: {
            name: "Art 2"
          }
        }, {
          imageUrl: "https://s-media-cache-ak0.pinimg.com/736x/8d/6c/b3/8d6cb3ca992d0e03a73d78a349f36" +
              "267.jpg",
          detail: {
            name: "Art 3"
          }
        }, {
          imageUrl: "https://s-media-cache-ak0.pinimg.com/736x/8d/6c/b3/8d6cb3ca992d0e03a73d78a349f36" +
              "267.jpg",
          detail: {
            name: "Art 4"
          }
        }
      ],
      filterText: ""
    };
  }

  render() {
    return (
      <div className="container">
        <div className="col-xs-12">
          <SearchBox/>
          <ArtCardGrid cards={this.state.cards} cardsPerRow={4}/>
        </div>
      </div>
    );
  }
}