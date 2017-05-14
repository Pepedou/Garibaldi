import React, {Component} from 'react';
import {Link} from 'react-router';
import {validateObligatoryFields} from '../../utils/fieldValidations'
import '../../Main.css';
import './LoginForm.css';

export default class LoginForm extends Component {
    handleOnClick(){
        let username = document.getElementById("username");
        let password = document.getElementById("password");

        let valid = validateObligatoryFields();

        if(valid){
            //TODO: [BE] Validar el inicio de sesión
        }
    }

    render() {
        return (
        <div className="LoginForm">
            <div className="Row">
                <div className="col-xs-0 col-md-4"></div>
                <div className="col-xs-12 col-md-4">
                    <div className="row marginTop">
                        <center>Aqui va el logo</center>
                    </div>
                    <div className="row marginTop">
                        <center>Entra ya y empieza a descubrir arte, artistas y galerías.</center>
                    </div>
                    <div className="row marginTop">
                        <div className="form-group">
                            <input type="text" placeholder="Nombre de usuario" className="form-control obligatoryField" id="username"/>
                            <input type="password" placeholder="Contraseña" className="form-control obligatoryField" id="password"/>
                            <center>
                                <div className="checkbox">
                                    <label><input type="checkbox" value=""/>Recuérdame</label>
                                </div>
                            </center>
                            <center>
                                <button type="button" className="btn btn-default" onClick={this.handleOnClick} id="loginBtn">Iniciar Sesión</button>
                            </center>
                        </div>
                    </div>
                    <div className="row divider marginTop"></div>
                    <div className="row marginTop">
                        <center><Link to="/forgotPassword" id="forgotPasswordBtn">¿Olvidaste tu nombre de usuario o contraseña?</Link></center>
                    </div>
                </div>
                <div className="col-xs-0 col-md-4"></div>
            </div>
        </div>
        );
  }
}