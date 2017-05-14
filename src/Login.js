import React, {Component} from 'react';
import LoginNavbar from './components/NavBar/LoginNavbar';
import LoginForm from './components/LoginForm/LoginForm';
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
