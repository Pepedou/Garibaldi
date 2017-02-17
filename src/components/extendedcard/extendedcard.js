import React, {Component} from 'react';

export default class ExtendedCard extends React {
  render() {
    return (
      <div className="row">
        <div className="col-xs-12 col-sm-12">
          <p>{this.props.detail.name}</p>
          <img src={this.props.imageUrl} alt="" className="extendedCardImage"/>
        </div>
      </div>
    );
  }
}