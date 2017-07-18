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
import FloatingBar from '../../partials/floating-bar/FloatingBar'
import {NotificationTypes} from '../../../components/alerts/notifications/NotificationTypes'
import {handleError} from '../../../utils/errorHandling'
import axios from 'axios'

require('../../../Main.css');

class BaseLayout extends Component {
  artistProfileClick() {
      let {currentUser, receiveCurrentArtist, showArtistOverlayRecieved, addNotification, loadingArtistDetail} = this.props

      showArtistOverlayRecieved(true)
      loadingArtistDetail(true)
      axios.get(`https://babelagunilla.herokuapp.com/api/getArtistDetail?id=${currentUser._id}`)
      .then(function (response) {
          receiveCurrentArtist(response.data)
          loadingArtistDetail(false)
      })
      .catch(function (error) {
          addNotification({type: NotificationTypes.DANGER, contentType: "text", message: error.response.data})
          loadingArtistDetail(false)
      })
  }

  render() {
    return (
      <div className="BaseLayout container-fluid degraded-container">
        <FloatingBar />
        <ArtCardOverlay />
        <ArtistCardOverlay />
        <FullImageOverlay />
        <ProfileNavBar user={this.props.currentUser}/>
        <MainNavBar user={this.props.currentUser} artistProfileClick={this.artistProfileClick.bind(this)}/>
        <div className="row"><NotificationComponent/></div>
        <div className="row">{this.props.children}</div>
      </div>
    );
  }
}

BaseLayout.displayName = 'BaseLayout'

BaseLayout.propTypes = {
  currentUser: PropTypes.object,
  receiveCurrentArtist: PropTypes.func,
  showArtistOverlayRecieved: PropTypes.func,
  addNotification: PropTypes.func,
  loadingArtistDetail: PropTypes.func
};

export const mapStateToProps = ({currentUser}) => ({
  currentUser
})

export const mapDispatchToProps = dispatch => ({
  receiveCurrentArtist: artist => dispatch({type: constants.CURRENT_ARTIST_RECEIVED, artist}),
  showArtistOverlayRecieved: show => dispatch({type: constants.SHOW_ARTIST_OVERLAY, show}),
  addNotification: notification => handleError(dispatch, notification),
  loadingArtistDetail: updatingCurrentArtist => dispatch({type: constants.UPDATING_CURRENT_ARTIST, updatingCurrentArtist})
})

export default connect(mapStateToProps, mapDispatchToProps)(BaseLayout)