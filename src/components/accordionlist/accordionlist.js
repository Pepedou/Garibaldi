import React, { Component } from 'react';

export default class AccordionList extends Component{
  
  buildAccordionList(){
    return this.props.accordions.map((accordion) => {
        return <Accordion title={accordion.title} content={accordion.content} type={accordion.type}/>
     });
  };
    
  render(){
    const accordions = this.buildAccordionList();
    <div className="row">
      <div className="panel-group" id="accordion">
        {accordions}
      </div>
    </div>
  }
}