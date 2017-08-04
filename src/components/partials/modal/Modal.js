import React, {Component} from 'react';
import './Modal.css';

export default class Modal extends Component {
  render() {
    let {header, children} = this.props
    return ( 
        <div className="Modal">
            <div className="Modal-header">{header}</div>
            <div className="Modal-content">{children}</div>
        </div>
    );
  }
}

Modal.displayName = 'Modal'

Modal.propTypes = {
  header: PropTypes.any,
  children: PropTypes.any
}