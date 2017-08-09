import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DropZoneComponent from '../..//ui/drop-zone/DropZoneComponent'
require('../../../Main.css')
require('./DropZoneOverlay.css')

export default class DropZoneOverlay extends Component {
    toggleOverlay(showDropZoneOverlayRecieved) {
        showDropZoneOverlayRecieved(false)
    }

    render() {
        let {showDropZoneOverlay, showDropZoneOverlayRecieved} = this.props
        return (showDropZoneOverlay 
         ? <div className="Overlay DropZone--overlay">
                <a className="Closebtn" onClick={() => this.toggleOverlay(showDropZoneOverlayRecieved)}>&times;</a>
                <div className="Overlay-content">
                    <DropZoneComponent {...this.props}/>
                </div>
            </div>
         : null);
    }
}

DropZoneOverlay.displayName = 'DropZoneOverlay'

DropZoneOverlay.propTypes = {
  showDropZoneOverlay: PropTypes.bool,
  showDropZoneOverlayRecieved: PropTypes.func
}