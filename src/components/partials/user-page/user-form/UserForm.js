import React, {Component} from 'react';
import {connect} from 'react-redux'
import {validateObligatoryFields, isEmailFormatValid, areFieldsEqual} from '../../../../utils/fieldValidations'
import DefaultButton from '../../../ui/buttons/DefaultButton'
import InputFieldComponent from '../../../ui/input-field/InputFieldComponent'
import {getForm, FormType} from '../../../../utils/forms/formUtils'
import {NotificationTypes} from '../../../alerts/notifications/NotificationTypes'
import * as constants from '../../../../redux/constants'
import '../../../../Main.css';
import './UserForm.css';

class UserForm extends Component {
    constructor(props)
    {
        super(props)

        this.state = {
            inputFields: getForm(FormType.USER_REGISTER)
        }
    }

    handleOnChange(event, index, value){
        console.log("event: ", event)
        console.log("index: ", index)
        console.log("value: ", value)
        console.log("target: ", event.target)
    }

    handleOnClick(event, {addNotification, clearAllNotifications}) {
        clearAllNotifications();
        
        let userFields = document.querySelectorAll(".userField input");
        let resultUserInformation = validateObligatoryFields(this.state.inputFields.userInformation);
        let resultPersonalInformation = validateObligatoryFields(this.state.inputFields.personalInformation);
        let user = {};
        let errorMessages = [];
        
        if(resultUserInformation.valid && resultPersonalInformation.valid){
            if(isEmailFormatValid(document.getElementById("email"))){
                if(areFieldsEqual(document.getElementById("password"), document.getElementById("confirmPassword"))
                && areFieldsEqual(document.getElementById("email"), document.getElementById("confirmEmail"))){
                    for(let i = 0; i < userFields.length; i++)
                    {
                        user[userFields[i].id] = userFields[i].value
                    }
                } else {
                    errorMessages.push("Los campos de contraseña y email y sus confirmaciones deben ser iguales")
                }
            } else {
                errorMessages.push("El formato del email es incorrecto")
            }
        }else {
            this.setState({inputFields: {userInformation: resultUserInformation.fieldList, personalInformation: resultPersonalInformation.fieldList}})
            errorMessages.push("Ingrese la información de los campos marcados en rojo")
        }

        if(errorMessages.length > 0) {
            addNotification({type: NotificationTypes.DANGER, contentType: "list", messages: errorMessages})
        }
        
        console.log(user);
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
                                                                    id={item.id}
                                                                    type={item.type}
                                                                    errorText={item.errorText}
                                                                    options={item.options}
                                                                    value={item.value}
                                                                    onChange={event => this.handleOnChange(event)}/>)
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
                                                                    id={item.id}
                                                                    type={item.type}
                                                                    errorText={item.errorText}
                                                                    options={item.options}
                                                                    value={item.value}
                                                                    onChange={event => this.handleOnChange(event)}/>)
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
                onTouchTap={event => this.handleOnClick(event, this.props)}
                />
        </div>
    </div>
    );
  }
}

UserForm.displayName = 'LoginForm'

export const mapDispatchToProps = dispatch => ({
  addNotification: notification => dispatch({type: constants.ADD_NOTIFICATION, notification}),
  clearAllNotifications: () => dispatch({type: constants.CLEAR_ALL_NOTIFICATIONS})
})

export default connect(null, mapDispatchToProps)(UserForm)