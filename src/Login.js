import React, {Component} from 'react';
import LoginNavbar from './components/partials/nav-bars/login-nav-bar/LoginNavbar';
import LoginForm from './components/partials/login-page/login-form/LoginForm';
import NotificationComponent from './components/alerts/notifications/NotificationComponent'
import './Main.css';

export default class Login extends Component {
  render() {
    return (
      <div className="Login container-fluid degraded-container">
        <NotificationComponent />
        <LoginNavbar selectedOption="loginOption"/>
        <LoginForm/>
      </div>
    );
  }
}
