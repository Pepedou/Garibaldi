import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as constants from '../../../../redux/constants'
import {connect} from 'react-redux'
require('../../../../Main.css')

class FullImageOverlay extends Component {
    toggleOverlay(showFullImageOverlayRecieved) {
        showFullImageOverlayRecieved(false)
    }

    render() {
        return  this.props.showFullImageOverlay ?
                <div className="Overlay FullImageOverlay-overlay">
                    <a className="Closebtn" onClick={() => this.toggleOverlay(this.props.showFullImageOverlayRecieved)}>&times;</a>
                    <div className="Overlay-content">
                        {
                            <img src={this.props.currentArt.detail.source.value} alt="" className="FullImageOverlay-image"/>
                        }
                    </div>
                </div> : null
    }
}

FullImageOverlay.displayName = 'FullImageOverlay'

FullImageOverlay.propTypes = {
  showFullImageOverlay: PropTypes.bool,
  currentArt: PropTypes.object
}

export const mapStateToProps = ({showFullImageOverlay, currentArt}) => ({
  showFullImageOverlay, currentArt
})

export const mapDispatchToProps = dispatch => ({
  showFullImageOverlayRecieved: show => dispatch({type: constants.SHOW_FULL_IMAGE_OVERLAY, show})
})

export default connect(mapStateToProps, mapDispatchToProps)(FullImageOverlay)