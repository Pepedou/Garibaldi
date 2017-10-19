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
        let firstDropColumn = `col-xs-12 col-md-${window.location.pathname === "/artists" ? 6 : 12}`
        return (showDropZoneOverlay 
         ? <div className="Overlay DropZone--overlay">
                <DefaultButton
                    label="Cerrar"
                    floatStyle="right"
                    onTouchTap={() => this.toggleOverlay(showDropZoneOverlayRecieved)}
                />
                <div className="Overlay-content">
                    <div className="row">
                        <div className={firstDropColumn}>
                            <DropZoneComponent {...this.props}/>
                        </div>
                        {
                            <div className="col-xs-12 col-md-6">
                                {
                                    window.location.pathname === "/artists"
                                    ? <DropZoneComponent {...this.props} hasExtraImages={true}/>
                                    : null
                                }
                            </div>
                        }
                    </div>
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