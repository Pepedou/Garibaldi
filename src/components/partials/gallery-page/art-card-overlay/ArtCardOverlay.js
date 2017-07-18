import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ArtCard from '../art-card/ArtCard'
import * as constants from '../../../../redux/constants'
import LoaderComponent from '../../../../components/ui/loader/LoaderComponent'
import {connect} from 'react-redux'
require('../../../../Main.css')

class ArtCardOverlay extends Component {
    toggleOverlay(showArtOverlayRecieved) {
        showArtOverlayRecieved(false)
    }

    render() {
        return (this.props.showArtOverlay ?
        <div className="Overlay">
            <a className="Closebtn" onClick={() => this.toggleOverlay(this.props.showArtOverlayRecieved)}>&times;</a>
            <div className="Overlay-content">
                {
                    this.props.updatingCurrentArt
                    ? <div className="marginTop"><center><LoaderComponent/></center></div>
                    : <ArtCard 
                        currentArt={this.props.currentArt} 
                        receiveCurrentArt={this.props.receiveCurrentArt} 
                        showFullImageOverlayRecieved={this.props.showFullImageOverlayRecieved}/>
                }
            </div>
        </div> : null);
    }
}

ArtCardOverlay.displayName = 'ArtCardOverlay'

ArtCardOverlay.propTypes = {
  showArtOverlay: PropTypes.bool,
  showArtOverlayRecieved: PropTypes.func,
  receiveCurrentArt: PropTypes.func,
  currentArt: PropTypes.object,
  updatingCurrentArt: PropTypes.bool,
  showFullImageOverlayRecieved: PropTypes.func
}

export const mapStateToProps = ({showArtOverlay, currentArt, updatingCurrentArt}) => ({
  showArtOverlay, currentArt, updatingCurrentArt
})

export const mapDispatchToProps = dispatch => ({
  showArtOverlayRecieved: show => dispatch({type: constants.SHOW_ART_OVERLAY, show}),
  receiveCurrentArt: art => dispatch({type: constants.CURRENT_ART_RECEIVED, art}),
  showFullImageOverlayRecieved: show => dispatch({type: constants.SHOW_FULL_IMAGE_OVERLAY, show})
})

export default connect(mapStateToProps, mapDispatchToProps)(ArtCardOverlay)