import React, { Component } from 'react';

class ArtPanel extends React {
  render(){
    <div className="col-xs-12 col-sm-6 col-lg-3">
      <ExtendedCard image={this.props.artItem.imageUrl} detail={this.props.artItem.detail}/>
      <AccordionList accordions={this.props.artItem.accordions}/>
    </div>
  }
}

// static propTypes = {
//     artItem: React.PropTypes.object.isRequired
//   };
export default ArtPanel;
