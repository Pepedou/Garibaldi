import React, {Component} from 'react';
import {validateObligatoryFields, isEmailFormatValid, areFieldsEqual} from '../../utils/fieldValidations'
import '../../Main.css';
import './UserForm.css';

export default class UserForm extends Component {
    handleOnClick() {
        
        let userFields = document.getElementsByClassName("userField");
        let user = {};
        let valid = validateObligatoryFields();
        
        if(valid){
            if(isEmailFormatValid(document.getElementById("email"))){
                if(areFieldsEqual(document.getElementById("password"), document.getElementById("confirmPassword"))
                && areFieldsEqual(document.getElementById("email"), document.getElementById("confirmEmail"))){
                    for(let i = 0; i < userFields.length; i++)
                    {
                        user[userFields[i].id] = userFields[i].value
                    }
                }
            }
        }

        //TODO: [BE] Guardar user, user trae toda la información del usuario, el nombre de la propiedad (Columna) es el id del input.
    }

  render() {
    return (
      <div className="UserForm col-xs-12">
        <div className="row subtitle">Datos de usuario</div>
        <div className="row">
            <input type="text" placeholder="Nombre de usuario" className="form-control userField obligatoryField" id="username"/>
            <input type="password" placeholder="Contraseña" className="form-control userField obligatoryField marginTop" id="password"/>
            <input type="password" placeholder="Vuelve a introducir tu contraseña" className="form-control userField obligatoryField" id="confirmPassword"/>
            <input type="email" placeholder="Correo electrónico" className="form-control userField obligatoryField marginTop" id="email"/>
            <input type="email" placeholder="Vuelve a introducir tu correo electrónico" className="form-control userField obligatoryField" id="confirmEmail"/>
        </div>
        <div className="row subtitle">Datos personales</div>
        <div className="row">
            <div className="col-xs-4 smallPadding"><input type="text" placeholder="Nombre" className="form-control userField obligatoryField" id="name"/></div>
            <div className="col-xs-4 smallPadding"><input type="text" placeholder="Primer Apellido" className="form-control userField obligatoryField" id="firstLastName"/></div>
            <div className="col-xs-4 smallPadding"><input type="text" placeholder="Segundo Apellido" className="form-control userField obligatoryField" id="secondLastName"/></div>
        </div>
        <div className="row marginTop">
            <div className="col-xs-4"><center><input type="number" placeholder="Día" className="form-control userField obligatoryField smallSize" id="day"/></center></div>
            <div className="col-xs-4"><center><input type="number" placeholder="Mes" className="form-control userField obligatoryField smallSize" id="month"/></center></div>
            <div className="col-xs-4"><center><input type="number" placeholder="Año" className="form-control userField obligatoryField smallSize" id="year"/></center></div>
        </div>
        <div className="row marginTop">
            <input type="text" placeholder="Dirección 1" className="form-control userField obligatoryField" id="address1"/>
        </div>
        <div className="row">
            <input type="text" placeholder="Dirección 2" className="form-control userField obligatoryField" id="address2"/>
        </div>
        <div className="row marginTop">
            <div className="col-xs-4 smallPadding"><input type="text" placeholder="Ciudad" className="form-control userField obligatoryField" id="city"/></div>
            <div className="col-xs-4 smallPadding"><input type="text" placeholder="Estado" className="form-control userField obligatoryField" id="state"/></div>
            <div className="col-xs-4 smallPadding"><input type="text" placeholder="País" className="form-control userField obligatoryField" id="country"/></div>
        </div>
        <div className="row subtitle">Tipo de usuario</div>
        <div className="row">
            <select id="                      npm install material-ui --save" className="userField obligatoryField">
                <option value="1">Gestor Cultural</option>
                <option value="2">Artista</option>
            </select>
        </div>
        <div className="row">
            <button type="button" className="btn btn-default" onClick={this.handleOnClick} id="saveUserBtn">Guardar Usuario</button>
        </div>
    </div>
    );
  }
}