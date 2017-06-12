import React, {Component} from 'react';
import LoginNavbar from './components/partials/nav-bars/login-nav-bar/LoginNavbar';
import LoginForm from './components/partials/login-page/login-form/LoginForm';
import NotificationComponent from './components/alerts/notifications/NotificationComponent'
import './Main.css';

export default class Login extends Component {
  render() {
    return (
      <div className="Login row">
        <div className="col-xs-12 col-md-12">
          <LoginNavbar selectedOption="loginOption"/>
          <div className="row"><NotificationComponent/></div>
          <LoginForm/>
        </div>
      </div>
    );
  }
}
