import React, {Component, PropTypes} from 'react';
import ProfileNavBar from '../../partials/nav-bars/profile-nav-bar/ProfileNavBar';
import {connect} from 'react-redux'
import NotificationComponent from '../../alerts/notifications/NotificationComponent'
import ArtCardOverlay from '../../partials/gallery-page/art-card-overlay/ArtCardOverlay'
import ArtistCardOverlay from '../../partials/artist-page/artist-card-overlay/ArtistCardOverlay'
import FullImageOverlay from '../../partials/gallery-page/full-image-overlay/FullImageOverlay'
require('../../../Main.css');

class BaseLayout extends Component {
  render() {
    return (
      <div className="BaseLaProfileNavBaryout container-fluid degraded-container">
        <ArtCardOverlay />
        <ArtistCardOverlay />
        <FullImageOverlay />
        <ProfileNavBar user={this.props.currentUser}/>
        <div className="row"><NotificationComponent/></div>
	      <div className="row">{this.props.children}</div>
      </div>
    );
  }
}

BaseLayout.displayName = 'BaseLayout'

BaseLayout.propTypes = {
  currentUser: PropTypes.object
};

export const mapStateToProps = ({currentUser}) => ({
  currentUser
})

export default connect(mapStateToProps, null)(BaseLayout)