import React, { Component } from 'react';

class ExtendedCard extends React {
  
  render(){
    <div className="row">
      <div className="col-xs-12 col-sm-12">
        <p>{this.props.detail.name}</p>
        <img src={this.props.imageUrl} alt="" className="extendedCardImage"/>
      </div>
    </div>
  }
}

// static propTypes = {
//     image: React.PropTypes.string.isRequired,
//     detail: React.PropTypes.object.isRequired
//   };
export default Mosaic;
