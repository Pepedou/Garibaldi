import React, {Component, PropTypes} from 'react';
import ProfileNavBar from '../../partials/nav-bars/profile-nav-bar/ProfileNavBar';
import userGCMock from '../../../mocks/userGCMock';
import {connect} from 'react-redux'
require('../../../Main.css');

class BaseLayout extends Component {
  render() {
    return (
      <div className="BaseLaProfileNavBaryout container-fluid degraded-container">
        <div className="row"><ProfileNavBar user={this.props.user}/></div>
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