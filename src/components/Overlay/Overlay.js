import React, {Component} from 'react';
import './Overlay.css';

export default class Overlay extends Component {
  constructor(props) {
        super(props);
        this.state = {
            isVisible: false
        };
    }

  toggleVisibility() {
    this.setState({
        isVisible: !this.state.isVisible
    });
  }

  render() {
    return (this.state.isVisible ?
    <div className="Overlay">
        <a className="Closebtn" onClick={this.toggleVisibility.bind(this)}>&times;</a>
        <div className="Overlay-content">
            {this.props.children}
        </div>
    </div> : null);
  }
}