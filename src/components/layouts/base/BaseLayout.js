import React, {Component} from 'react';
import ProfileNavBar from '../../partials/nav-bars/profile-nav-bar/ProfileNavBar';
require('../../../Main.css');

export default class BaseLayout extends Component {
  render() {
    return (
      <div className="BaseLaProfileNavBaryout container-fluid degraded-container">
        {/*<div className="row"><ProfileNavBar/></div>*/}
        <div className="row">{this.props.children}</div>
      </div>
    );
  }
}