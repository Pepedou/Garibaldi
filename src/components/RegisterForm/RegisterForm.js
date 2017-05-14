import React, {Component} from 'react';
import UserForm from '../../components/UserForm/UserForm';
import '../../Main.css';
import './RegisterForm.css';

export default class RegisterForm extends Component {
  render() {
    return (
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
                  <div className="row divider marginTop"></div>
                  <div className="row">
                    <UserForm/>
                  </div>
              </div>
              <div className="col-xs-0 col-md-4"></div>
          </div>
      </div>
    );
  }
}