import React, {Component} from 'react';
import {validateObligatoryFields, isEmailFormatValid, areFieldsEqual} from '../../../../utils/fieldValidations'
import TextFieldComponent from '../../../ui/text-field/TextFieldComponent'
import SelectFieldComponent from '../../../ui/select-field/SelectFieldComponent'
import '../../../../Main.css';
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
            <TextFieldComponent
                hintText="Ingresa el nombre de usuario"
                floatingLabelText="Nombre de usuario"
                name="username"
                className="userField obligatoryField"
                type="text"
                />
            <TextFieldComponent
                hintText="Ingrese la contraseña"
                floatingLabelText="Contraseña"
                name="password"
                className="userField obligatoryField"
                type="password"
                />
            <TextFieldComponent
                hintText="Ingrese la contraseña nuevamente"
                floatingLabelText="Confirmación de contraseña"
                name="confirmPassword"
                className="userField obligatoryField"
                type="password"
                />
            <TextFieldComponent
                hintText="Ingrese el correo eletrónico"
                floatingLabelText="Correo electrónico"
                name="email"
                className="userField obligatoryField"
                type="email"
                />
            <TextFieldComponent
                hintText="Ingrese el correo eletrónico nuevamente"
                floatingLabelText="Confirmación de correo electrónico"
                name="confirmEmail"
                className="userField obligatoryField"
                type="email"
                />
            <SelectFieldComponent 
                floatingLabelText="Tipo de usuario"
                options={[{value: 1, text: "Gestor Cultural"}, {value: 2, text: "Artista"}]}
                className="userField obligatoryField"
                name="userType"
                />
        </div>
        <div className="row subtitle">Datos personales</div>
        <div className="row">
            <div className="col-xs-6 smallPadding">
                <TextFieldComponent
                    hintText="Ingresa el nombre"
                    floatingLabelText="Nombre"
                    name="name"
                    className="userField obligatoryField"
                    type="text"
                    />
            </div>
             <div className="col-xs-6 smallPadding">
                <TextFieldComponent
                    hintText="Ingresa el apellido"
                    floatingLabelText="Apellido"
                    name="lastName"
                    className="userField obligatoryField"
                    type="text"
                    />
            </div>
        </div>
        <div className="row marginTop">
            <div className="col-xs-4">
                <center>
                    <TextFieldComponent
                        hintText="Ingresa el día"
                        floatingLabelText="Día"
                        name="day"
                        className="userField obligatoryField smallSize"
                        type="number"
                        />
                </center>
            </div>
            <div className="col-xs-4">
                <center>
                    <TextFieldComponent
                        hintText="Ingresa el mes"
                        floatingLabelText="Mes"
                        name="month"
                        className="userField obligatoryField smallSize"
                        type="number"
                        />
                </center>
            </div>
            <div className="col-xs-4">
                <center>
                    <TextFieldComponent
                        hintText="Ingresa el año"
                        floatingLabelText="Año"
                        name="year"
                        className="userField obligatoryField smallSize"
                        type="number"
                        />
                </center>
            </div>
        </div>
        <div className="row marginTop">
            <TextFieldComponent
                hintText="Ingresa la dirección 1"
                floatingLabelText="Dirección 1"
                name="address1"
                className="userField obligatoryField"
                type="text"
                />
        </div>
        <div className="row">
            <TextFieldComponent
                hintText="Ingresa la dirección 2"
                floatingLabelText="Dirección 2"
                name="address2"
                className="userField obligatoryField"
                type="text"
                />
        </div>
        <div className="row marginTop">
            <div className="col-xs-4 smallPadding">
                <TextFieldComponent
                    hintText="Ingresa la ciudad"
                    floatingLabelText="Ciudad"
                    name="city"
                    className="userField obligatoryField"
                    type="text"
                    />
            </div>
            <div className="col-xs-4 smallPadding">
                <TextFieldComponent
                    hintText="Ingresa el estado"
                    floatingLabelText="Estado"
                    name="state"
                    className="userField obligatoryField"
                    type="text"
                    />
            </div>
            <div className="col-xs-4 smallPadding">
                <TextFieldComponent
                    hintText="Ingresa el país"
                    floatingLabelText="País"
                    name="country"
                    className="userField obligatoryField"
                    type="text"
                    />
            </div>
        </div>
        <div className="row">
            <button type="button" className="btn btn-default" onClick={this.handleOnClick} id="saveUserBtn">Guardar Usuario</button>
        </div>
    </div>
    );
  }
}