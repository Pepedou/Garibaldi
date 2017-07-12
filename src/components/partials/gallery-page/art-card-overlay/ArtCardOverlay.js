import React, {Component, PropTypes} from 'react';
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
                    : <ArtCard currentArt={this.props.currentArt} receiveCurrentArt={this.props.receiveCurrentArt}/>
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
  updatingCurrentArt: PropTypes.bool
}

export const mapStateToProps = ({showArtOverlay, currentArt, updatingCurrentArt}) => ({
  showArtOverlay, currentArt, updatingCurrentArt
})

export const mapDispatchToProps = dispatch => ({
  showArtOverlayRecieved: show => dispatch({type: constants.SHOW_ART_OVERLAY, show}),
  receiveCurrentArt: art => dispatch({type: constants.CURRENT_ART_RECEIVED, art})
})

export default connect(mapStateToProps, mapDispatchToProps)(ArtCardOverlay)