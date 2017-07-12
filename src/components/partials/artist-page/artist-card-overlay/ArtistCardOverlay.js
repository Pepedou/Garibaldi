import React, {Component, PropTypes} from 'react';
import ArtistCard from '../artist-card/ArtistCard'
import * as constants from '../../../../redux/constants'
import LoaderComponent from '../../../../components/ui/loader/LoaderComponent'
import {connect} from 'react-redux'
require('../../../../Main.css')

class ArtistCardOverlay extends Component {
    toggleOverlay(showArtistOverlayRecieved) {
        showArtistOverlayRecieved(false)
    }

    render() {
        return (this.props.showArtistOverlay ?
        <div className="Overlay">
            <a className="Closebtn" onClick={() => this.toggleOverlay(this.props.showArtistOverlayRecieved)}>&times;</a>
            <div className="Overlay-content">
                {
                    this.props.updatingCurrentArtist
                    ? <div className="marginTop"><center><LoaderComponent/></center></div>
                    : <ArtistCard currentArtist={this.props.currentArtist} receiveCurrentArtist={this.props.receiveCurrentArtist}/>
                }
            </div>
        </div> : null);
    }
}

ArtistCardOverlay.displayName = 'ArtistCardOverlay'

ArtistCardOverlay.propTypes = {
  showArtistOverlay: PropTypes.bool,
  showArtistOverlayRecieved: PropTypes.func,
  receiveCurrentArtist: PropTypes.func,
  currentArtist: PropTypes.object,
  updatingCurrentArtist: PropTypes.bool
}

export const mapStateToProps = ({showArtistOverlay, currentArtist, updatingCurrentArtist}) => ({
  showArtistOverlay, currentArtist, updatingCurrentArtist
})

export const mapDispatchToProps = dispatch => ({
  showArtistOverlayRecieved: show => dispatch({type: constants.SHOW_ARTIST_OVERLAY, show}),
  receiveCurrentArtist: artist => dispatch({type: constants.CURRENT_ARTIST_RECEIVED, artist})
})

export default connect(mapStateToProps, mapDispatchToProps)(ArtistCardOverlay)