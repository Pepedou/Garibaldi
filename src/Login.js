import React, {Component} from 'react';
import LoginNavbar from './components/partials/nav-bars/login-nav-bar/LoginNavbar';
import LoginForm from './components/partials/login-page/login-form/LoginForm';
import './Main.css';

export default class Login extends Component {
  render() {
    return (
      <div className="Login container-fluid degraded-container">
        <LoginNavbar selectedOption="loginOption"/>
        <LoginForm/>
      </div>
    );
  }
}
