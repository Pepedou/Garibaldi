import React, {Component} from 'react';
import './Modal.css';

export default class Modal extends Component {
  render() {
    return ( 
        <div className="Modal">
            <div className="Modal-header">{this.props.header}</div>
            <div className="Modal-content">{this.props.children}</div>
        </div>
    );
  }
}