import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ProfileNavBar from '../../partials/nav-bars/profile-nav-bar/ProfileNavBar';
import {connect} from 'react-redux'
import NotificationComponent from '../../alerts/notifications/NotificationComponent'
import ReturnNavBar from '../../partials/nav-bars/return-nav-bar/ReturnNavBar'

require('../../../Main.css');

class SimpleLayout extends Component {
  render() {
    return (
      <div className="SimpleLayout container-fluid degraded-container">
        <ProfileNavBar user={this.props.currentUser}/>
        <ReturnNavBar/>
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