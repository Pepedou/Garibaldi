import React, {Component} from 'react'
import LoginNavbar from '../../components/partials/nav-bars/login-nav-bar/LoginNavbar'
import UserForm from '../../components/partials/user-page/user-form/UserForm'
import DividerComponent from '../../components/ui/divider/DividerComponent'
import '../../Main.css'
import './RegisterPage.css'

export default class Register extends Component {
  render() {
    return (
      <div className="Register container-fluid degraded-container">
        <LoginNavbar selectedOption="registerOption"/>
         <div className="RegisterForm">
          <div className="row">
              <div className="col-xs-0 col-md-4"></div>
              <div className="col-xs-12 col-md-4">
                  <div className="row marginTop">
                      <center>Aqui va el logo</center>
                  </div>
                  <div className="row marginTop">
                      <center>Ingresa tus datos para empezar a usar Artchive</center>
                  </div>
                  <div className="row marginTop">
                    <DividerComponent />
                  </div>
                  <div className="row">
                    <UserForm/>
                  </div>
              </div>
              <div className="col-xs-0 col-md-4"></div>
          </div>
      </div>
    </div>
    );
  }
}
