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

class SimpleLayout extends Component {
  render() {
    return (
      <div className="SimpleLayout container-fluid degraded-container">
        <ProfileNavBar user={this.props.currentUser}/>
        <div className="row"><NotificationComponent/></div>
        <div className="row">{this.props.children}</div>
      </div>
    );
  }
}

SimpleLayout.displayName = 'SimpleLayout'

SimpleLayout.propTypes = {
  currentUser: PropTypes.object
};

export const mapStateToProps = ({currentUser}) => ({
  currentUser
})

export default connect(mapStateToProps, null)(SimpleLayout)