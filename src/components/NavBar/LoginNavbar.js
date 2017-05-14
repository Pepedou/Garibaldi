import React, {Component} from 'react';
import './LoginNavbar.css';

export default class LoginNavbar extends Component {
    render() {
        return (
            <div className="LoginNavbar">
                <div className="row">
                    <div className="col-xs-12 col-md-4">
                        <div className="loginOption">Regístrate</div>
                        <div className="loginOption">Iniciar sesión</div>
                    </div>
                    <div className="col-xs-12 col-md-4">
                        Aqui va el logo
                    </div>
                    <div className="col-xs-12 col-md-4"></div>
                </div>
            </div> 
        );
    }
}