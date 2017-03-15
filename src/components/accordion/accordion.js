import React, {Component} from 'react';

export default class Accordion extends React {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h4 className="panel-title">
            <a
              data-toggle="collapse"
              data-parent="#accordion"
              href={`#collapse${this.prop.type}`}>
              {this.props.title}</a>
          </h4>
        </div>
        <div id={`collapse${this.prop.type}`} className="panel-collapse collapse in">
          <div className="panel-body">{this.props.content.description}</div>
        </div>
      </div>
    );
  }
}