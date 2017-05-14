import React, {Component} from 'react';
import LoginNavbar from '../../components/NavBar/LoginNavbar';
import '../../Main.css';

export default class ForgotPassword extends Component {
  render() {
    return (
      <div className="ForgotPassword container-fluid degraded-container">
        <LoginNavbar/>
        {/*TODO: [FE] Crear el contenido cuando el diseño esté finalizado*/}
      </div>
    );
  }
}
