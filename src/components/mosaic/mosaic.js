import React, { Component } from 'react';
import ArtCardGrid from '../artcardgrid/artcardgrid';
//import 'bootstrap/dist/css/bootstrap.css';

class Mosaic extends Component{
    constructor(props){
        super(props);
        this.state = {
            cards: [      
            {imageUrl:"https://s-media-cache-ak0.pinimg.com/736x/8d/6c/b3/8d6cb3ca992d0e03a73d78a349f36267.jpg", detail:{name:"Art 1"}},
            {imageUrl:"https://s-media-cache-ak0.pinimg.com/736x/8d/6c/b3/8d6cb3ca992d0e03a73d78a349f36267.jpg", detail:{name:"Art 2"}},
            {imageUrl:"https://s-media-cache-ak0.pinimg.com/736x/8d/6c/b3/8d6cb3ca992d0e03a73d78a349f36267.jpg", detail:{name:"Art 3"}},
            {imageUrl:"https://s-media-cache-ak0.pinimg.com/736x/8d/6c/b3/8d6cb3ca992d0e03a73d78a349f36267.jpg", detail:{name:"Art 4"}}
            ],
            filterText: ""
        };
    }

  render(){
    return (
      <div className="col-xs-12">
        <div className="row">
          <div className="col-lg-6">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Search for..." />
              <span className="input-group-btn">
                <button className="btn btn-default" type="button">Go!</button>
              </span>
            </div>
          </div>
        </div>
        <ArtCardGrid cards={this.state.cards} cardsPerRow={4}/>
      </div>
    );
  }
}

export default Mosaic;
