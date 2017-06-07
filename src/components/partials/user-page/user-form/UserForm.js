import React, {Component} from 'react';
import {validateObligatoryFields, isEmailFormatValid, areFieldsEqual} from '../../../../utils/fieldValidations'
import DefaultButton from '../../../ui/buttons/DefaultButton'
import InputFieldComponent from '../../../ui/input-field/InputFieldComponent'
import {getForm, FormType} from '../../../../utils/forms/formUtils'
import '../../../../Main.css';
import './UserForm.css';

export default class UserForm extends Component {
    constructor(props)
    {
        super(props)

        this.state = {
            inputFields: getForm(FormType.USER_REGISTER)
        }
    }

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
        <div className="row">
            <div className="col-xs-12 col-md-6">
                <div className="row subtitle">Datos de usuario</div>
                <div className="row">
                    <div className="col-xs-12 col-md-12">
                        {
                            this.state.inputFields.userInformation.map((item, key) => <InputFieldComponent key={key}
                                                                    inputType={item.inputType} 
                                                                    hintText={item.hintText}
                                                                    floatingLabelText={item.floatingLabelText}
                                                                    name={item.name}
                                                                    className={item.className}
                                                                    type={item.type}
                                                                    fieldErrorMessage={item.fieldErrorMessage}/>)
                        }
                    </div>
                </div>
            </div>
            <div className="col-xs-12 col-md-6">
                <div className="row subtitle">Datos personales</div>
                <div className="row">
                    <div className="col-xs-12 col-md-12">
                        {
                            this.state.inputFields.personalInformation.map((item, key) => <InputFieldComponent key={key}
                                                                    inputType={item.inputType} 
                                                                    hintText={item.hintText}
                                                                    floatingLabelText={item.floatingLabelText}
                                                                    name={item.name}
                                                                    className={item.className}
                                                                    type={item.type}
                                                                    fieldErrorMessage={item.fieldErrorMessage}/>)
                        }
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <DefaultButton
                label="Guardar Usuario"
                labelPosition="after"
                floatStyle="right"
                onTouchTap={this.handleOnClick}
                />
        </div>
    </div>
    );
  }
}