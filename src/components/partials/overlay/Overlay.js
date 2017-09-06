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
    let {isVisible, onClose, children}
    return (isVisible ?
    <div className="Overlay">
        <a className="Closebtn" onClick={onClose}>&times;</a>
        <div className="Overlay-content">
            {children}
        </div>
    </div> : null);
  }
}