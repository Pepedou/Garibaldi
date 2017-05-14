import React, {Component} from 'react';
import LoginNavbar from './components/NavBar/LoginNavbar';
import LoginForm from './components/LoginForm/LoginForm';
import './Main.css';
import './Login.css';

export default class Login extends Component {
  render() {
    return (
      <div className="login container-fluid degraded-container">
        <LoginNavbar/>
        <LoginForm/>
      </div>
    );
  }
}
