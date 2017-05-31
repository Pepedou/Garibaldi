import React, {Component} from 'react';
import LoginNavbar from '../../partials/nav-bars/login-nav-bar/LoginNavbar';
require('../../../Main.css');

export default class LoginLayout extends Component {
  render() {
    return (
      <div className="LoginLayout container-fluid degraded-container">
        {this.props.children}
      </div>
    );
  }
}