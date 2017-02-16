import React, { Component } from 'react';

class AccordionList extends Component{
  
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

// static propTypes = {
//     accordions: React.PropTypes.array.isRequired
//   };

export default AccordionList;