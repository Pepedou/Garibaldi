import React, {Component} from 'react';
import './Overlay.css';

export default class Overlay extends Component {
  constructor(props) {
        super(props);
        this.state = {
            isVisible: false
        };
    }
    
  render() {
    return (this.props.isVisible ?
    <div className="Overlay">
        <a className="Closebtn" onClick={this.props.onClose}>&times;</a>
        <div className="Overlay-content">
            {this.props.children}
        </div>
    </div> : null);
  }
}