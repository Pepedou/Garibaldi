import React, {Component} from 'react';
import './OverlayWithButton.css';
var FontAwesome = require('react-fontawesome');

export default class OverlayWithButton extends Component {
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
    let button = <button type="button" onClick={this.toggleVisibility.bind(this)} className="addArtButton">Agregar obra</button>
    let overlay = this.state.isVisible ?
    <div className="overlay">
        <a className="closebtn" onClick={this.toggleVisibility.bind(this)}>&times;</a>
        <div className="overlay-content">
            {this.props.children}
        </div>
    </div> : null

    return ( 
        <div className="OverlayWithButton">
            <FontAwesome
        className='super-crazy-colors'
        name='rocket'
        size='2x'
        spin
        style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
      />
            {button}
            {overlay}
        </div>
    );
  }
}