import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DropZoneComponent from '../../ui/drop-zone/DropZoneComponent'
import DefaultButton from '../../ui/buttons/DefaultButton'
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
                <DefaultButton
                    label="Cerrar"
                    floatStyle="right"
                    onTouchTap={() => this.toggleOverlay(showDropZoneOverlayRecieved)}
                />
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