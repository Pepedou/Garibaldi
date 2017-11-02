import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ProfileNavBar from '../../partials/nav-bars/profile-nav-bar/ProfileNavBar';
import {connect} from 'react-redux'
import * as constants from '../../../redux/constants'
import NotificationComponent from '../../alerts/notifications/NotificationComponent'
import ArtCardOverlay from '../../partials/gallery-page/art-card-overlay/ArtCardOverlay'
import ArtistCardOverlay from '../../partials/artist-page/artist-card-overlay/ArtistCardOverlay'
import FullImageOverlay from '../../partials/gallery-page/full-image-overlay/FullImageOverlay'
import MainNavBar from '../../partials/nav-bars/main-nav-bar/MainNavBar'
import DropZoneOverlay from '../../partials/overlay/DropZoneOverlay'
import FloatingBar from '../../partials/floating-bar/FloatingBar'
import {handleError} from '../../../utils/errorHandling'
import ArtistServices from '../../../utils/services/artistServices'


require('../../../Main.css');

class BaseLayout extends Component {

  artistProfileClick() {
      let {currentUser, receiveCurrentArtist, showArtistOverlayRecieved, addNotification, loadingArtistDetail, clearAllNotifications} = this.props
      clearAllNotifications()
      showArtistOverlayRecieved(true)
      loadingArtistDetail(true)

      ArtistServices.getDetail(currentUser.ownerId)
      .then(function (response) {
          receiveCurrentArtist(response)
          loadingArtistDetail(false)
      })
      .catch(function (error) {
          addNotification(error)
          loadingArtistDetail(false)
      })
  }

  render() {
    return (
      <div className="BaseLayout container-fluid degraded-container">
        <FloatingBar {...this.props}/>
        <ArtCardOverlay {...this.props}/>
        <ArtistCardOverlay {...this.props}/>
        <DropZoneOverlay {...this.props}/>
        <FullImageOverlay {...this.props}/>
        <ProfileNavBar {...this.props}/>
        <MainNavBar {...this.props} artistProfileClick={this.artistProfileClick.bind(this)}/>
        <div className="row"><NotificationComponent/></div>
        <div className="row">{this.props.children}</div>
      </div>
    );
  }
}

BaseLayout.displayName = 'BaseLayout'

BaseLayout.propTypes = {
  checkCards: PropTypes.array,
  currentArt: PropTypes.object,
  currentArtist: PropTypes.object,
  currentUser: PropTypes.object,
  extraImages: PropTypes.array,
  showArtOverlay: PropTypes.bool,
  showArtistOverlay: PropTypes.bool,
  showDropZoneOverlay: PropTypes.bool,
  showFullImageOverlay: PropTypes.bool,
  sourceImage: PropTypes.string,
  updatingCurrentArt: PropTypes.bool,
  updatingCurrentArtist: PropTypes.bool,
  addNotification: PropTypes.func,
  clearAllNotifications: PropTypes.func,
  clearCheckCards: PropTypes.func,
  loadingArtDetail: PropTypes.func,
  loadingArtGallery: PropTypes.func,
  loadingArtistDetail: PropTypes.func,
  loadingGallery: PropTypes.func,
  receiveArtGallery: PropTypes.func,
  receiveArtistGallery: PropTypes.func,
  receiveCurrentArt: PropTypes.func,
  receiveCurrentArtist: PropTypes.func,
  receiveCurrentUser: PropTypes.func,
  showArtOverlayRecieved: PropTypes.func,
  showArtistOverlayRecieved: PropTypes.func,
  showDropZoneOverlayRecieved: PropTypes.func,
  showFullImageOverlayRecieved: PropTypes.func,
  updateArtGallery: PropTypes.func,
  addCheckCard: PropTypes.func,
  deleteCheckCard: PropTypes.func
};

export const mapStateToProps = ({checkCards, currentArt, currentArtist, currentUser, showArtOverlay, 
  showArtistOverlay, showFullImageOverlay, updatingCurrentArt, updatingCurrentArtist, showDropZoneOverlay, 
  sourceImage, extraImages}) => ({
  checkCards,
  currentArt,
  currentArtist,
  currentUser,
  showArtOverlay,
  showArtistOverlay,
  showFullImageOverlay,
  sourceImage,
  updatingCurrentArt,
  updatingCurrentArtist,
  showDropZoneOverlay,
  extraImages
})

export const mapDispatchToProps = dispatch => ({
  addNotification: notification => handleError(dispatch, notification),
  clearAllNotifications: () => dispatch({type: constants.CLEAR_ALL_NOTIFICATIONS}),
  clearCheckCards: show => dispatch({type: constants.CLEAR_CHECK_CARDS}),
  loadingArtDetail: updatingCurrentArt => dispatch({type: constants.UPDATING_CURRENT_ART, updatingCurrentArt}),
  loadingArtistDetail: updatingCurrentArtist => dispatch({type: constants.UPDATING_CURRENT_ARTIST, updatingCurrentArtist}),
  loadingArtGallery: updatingArtGallery => dispatch({type: constants.UPDATING_ART_GALLERY, updatingArtGallery}),
  loadingArtistGallery: updatingArtistGallery => dispatch({type: constants.UPDATING_ARTIST_GALLERY, updatingArtistGallery}),
  receiveArtGallery: artGallery => dispatch({type: constants.ART_GALLERY_RECIEVED, artGallery}),
  receiveArtistGallery: artistGallery => dispatch({type: constants.ARTIST_GALLERY_RECIEVED, artistGallery}),
  receiveCurrentArt: art => dispatch({type: constants.CURRENT_ART_RECEIVED, art}),
  receiveCurrentArtist: artist => dispatch({type: constants.CURRENT_ARTIST_RECEIVED, artist}),
  receiveCurrentUser: user => dispatch({type: constants.CURRENT_USER_RECIEVED, user}),
  showArtOverlayRecieved: show => dispatch({type: constants.SHOW_ART_OVERLAY, show}),
  showArtistOverlayRecieved: show => dispatch({type: constants.SHOW_ARTIST_OVERLAY, show}),
  showFullImageOverlayRecieved: show => dispatch({type: constants.SHOW_FULL_IMAGE_OVERLAY, show}),
  updateArtGallery: updatingArtGallery => dispatch({type: constants.UPDATING_ART_GALLERY, updatingArtGallery}),
  showDropZoneOverlayRecieved: show => dispatch({type: constants.SHOW_DROPZONE_OVERLAY, show}),
  sourceImageRecieved: sourceImage => dispatch({type: constants.SOURCE_IMAGE_RECEIVED, sourceImage}),
  extraImagesReceived: extraImages => dispatch({type: constants.EXTRA_IMAGES_RECIEVED, extraImages}),
  addCheckCard: cardId => dispatch({type: constants.ADD_CHECK_CARD, cardId}),
  deleteCheckCard: cardId => dispatch({type: constants.DELETE_CHECK_CARD, cardId})
})

export default connect(mapStateToProps, mapDispatchToProps)(BaseLayout)