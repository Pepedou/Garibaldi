import React, {Component} from 'react';
import './LoginForm.css';
import '../../Main.css';

export default class LoginForm extends Component {
  render() {
    return (
      <div className="LoginForm">
          <div className="Row">
              <div className="col-xs-0 col-md-4"></div>
              <div className="col-xs-12 col-md-4">
                  <div className="row">
                      Aqui va el logo
                  </div>
                  <div className="row marginTop">
                      <center>Entra ya y empieza a descubrir arte, artistas y galerías.</center>
                  </div>
                  <div className="row marginTop">
                      <div className="form-group">
                        <input type="text" placeholder="Nombre de usuario" className="form-control" id="username"/>
                        <input type="text" placeholder="Contraseña" className="form-control" id="password"/>
                        <center>
                            <div className="checkbox">
                                <label><input type="checkbox" value=""/>Recuérdame</label>
                            </div>
                        </center>
                      </div>
                  </div>
                  <div className="row divider marginTop"></div>
                  <div className="row marginTop">
                      <center><a id="forgotPasswordBtn">¿Olvidaste tu nombre de usuario o contraseña?</a></center>
                  </div>
              </div>
              <div className="col-xs-0 col-md-4"></div>
          </div>
      </div>
    );
  }
}