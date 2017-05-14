import React, {Component} from 'react';
import LoginNavbar from '../../components/NavBar/LoginNavbar';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import '../../Main.css';

export default class Register extends Component {
  render() {
    return (
      <div className="Register container-fluid degraded-container">
        <LoginNavbar selectedOption="registerOption"/>
        <RegisterForm/>
      </div>
    );
  }
}
