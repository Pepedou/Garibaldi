import React, {Component, PropTypes} from 'react';
import ProfileNavBar from '../../partials/nav-bars/profile-nav-bar/ProfileNavBar';
import userGCMock from '../../../mocks/userGCMock';
import {connect} from 'react-redux'
import MainNavBar from '../../partials/nav-bars/main-nav-bar/MainNavBar'
require('../../../Main.css');

class BaseLayout extends Component {
  render() {
    return (
      <div className="BaseLaProfileNavBaryout container-fluid degraded-container">
        <ProfileNavBar user={this.props.user}/>
        <MainNavBar user={this.props.user}/>
	      <div className="row">{this.props.children}</div>
      </div>
    );
  }
}

BaseLayout.displayName = 'BaseLayout'

BaseLayout.propTypes = {
  user: PropTypes.object
};

export const mapStateToProps = ({user}) => ({
  user: userGCMock
})

export default connect(mapStateToProps, null)(BaseLayout)