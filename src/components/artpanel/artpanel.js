import React, {Component} from 'react';

export default class ArtPanel extends React {
  render() {
    return (
      <div className="col-xs-12 col-sm-6 col-lg-3">
        <ExtendedCard
          image={this.props.artItem.imageUrl}
          detail={this.props.artItem.detail}/>
        <AccordionList accordions={this.props.artItem.accordions}/>
      </div>
    );
  }
}