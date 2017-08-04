import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ArtistCard from '../artist-card/ArtistCard'
import LoaderComponent from '../../../../components/ui/loader/LoaderComponent'
require('../../../../Main.css')

export default class ArtistCardOverlay extends Component {
    toggleOverlay(showArtistOverlayRecieved) {
        showArtistOverlayRecieved(false)
    }

    render() {
        let {showArtistOverlay, showArtistOverlayRecieved, updatingCurrentArtist, currentArtist, receiveCurrentArtist} = this.props
        return (showArtistOverlay ?
        <div className="Overlay">
            <a className="Closebtn" onClick={() => this.toggleOverlay(showArtistOverlayRecieved)}>&times;</a>
            <div className="Overlay-content">
                {
                    updatingCurrentArtist
                    ? <div className="marginTop"><center><LoaderComponent/></center></div>
                    : <ArtistCard currentArtist={currentArtist} receiveCurrentArtist={receiveCurrentArtist}/>
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