import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ProfileNavBar from '../../partials/nav-bars/profile-nav-bar/ProfileNavBar';
import {connect} from 'react-redux'
import * as constants from '../../../redux/constants'
import NotificationComponent from '../../alerts/notifications/NotificationComponent'
import ReturnNavBar from '../../partials/nav-bars/return-nav-bar/ReturnNavBar'
import PdfPreviewOverlay from '../../partials/export-page/pdf-preview-overlay/PdfPreviewOverlay'

require('../../../Main.css');

class SimpleLayout extends Component {
  render() {
    return (
      <div className="SimpleLayout container-fluid degraded-container">
        <PdfPreviewOverlay {...this.props}/>
        <ProfileNavBar {...this.props}/>
        <ReturnNavBar/>
        <div className="row"><NotificationComponent/></div>
        <div className="row">{this.props.children}</div>
      </div>
    );
  }
}

SimpleLayout.displayName = 'SimpleLayout'

SimpleLayout.propTypes = {
  currentUser: PropTypes.object,
  showPdfPreviewOverlay: PropTypes.bool,
  receiveCurrentUser: PropTypes.func,
  showPdfPreviewOverlayRecieved: PropTypes.func
};

export const mapStateToProps = ({currentUser, showPdfPreviewOverlay}) => ({
  currentUser,
  showPdfPreviewOverlay
})

export const mapDispatchToProps = dispatch => ({
  receiveCurrentUser: user => dispatch({type: constants.CURRENT_USER_RECIEVED, user}),
  showPdfPreviewOverlayRecieved: show => dispatch({type: constants.SHOW_PDF_PREVIEW_OVERLAY, show})
})

export default connect(mapStateToProps, mapDispatchToProps)(SimpleLayout)