import React, {Component} from 'react';
import PropTypes from 'prop-types';
require('../../../../Main.css')

export default class FullImageOverlay extends Component {
    toggleOverlay(showFullImageOverlayRecieved) {
        showFullImageOverlayRecieved(false)
    }

    render() {
        let {showFullImageOverlay, showFullImageOverlayRecieved, currentArt} = this.props
        return  showFullImageOverlay ?
                <div className="Overlay FullImageOverlay-overlay">
                    <a className="Closebtn" onClick={() => this.toggleOverlay(showFullImageOverlayRecieved)}>&times;</a>
                    <div className="Overlay-content">
                        {
                            <center>
                                <img src={currentArt.detail.images.value.standard} alt="" className="FullImageOverlay-image"/>
                            </center>
                        }
                    </div>
                </div> : null
    }
}

FullImageOverlay.displayName = 'FullImageOverlay'

FullImageOverlay.propTypes = {
  showFullImageOverlay: PropTypes.bool,
  showFullImageOverlayRecieved: PropTypes.func,
  currentArt: PropTypes.object
}