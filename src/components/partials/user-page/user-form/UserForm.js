import React, {Component} from 'react';
import {connect} from 'react-redux'
import {validateObligatoryFields, getFieldIndex, getUserFields, getFieldValue, isEmailFormatValid, areFieldsEqual, updateField} from '../../../../utils/fieldValidations'
import DefaultButton from '../../../ui/buttons/DefaultButton'
import InputFieldComponent from '../../../ui/input-field/InputFieldComponent'
import {getForm, FormType} from '../../../../utils/forms/formUtils'
import {NotificationTypes} from '../../../alerts/notifications/NotificationTypes'
import * as constants from '../../../../redux/constants'
import '../../../../Main.css';
import './UserForm.css';
import axios from 'axios'

class UserForm extends Component {
    constructor(props)
    {
        super(props)

        this.state = {
            inputFields: getForm(FormType.USER_REGISTER)
        }
    }

    handleOnChange(event, index, value){
        let inputFieldsCopy = {...this.state.inputFields}
        let className = "";

        if(event.target.tagName === "INPUT") {
            className = document.getElementById(event.target.id).parentElement.className;
        } else {
            className = event.target.className;
        }
        
        if(className.indexOf("userInformation") !== -1) {
            let currentFieldIndex = getFieldIndex(inputFieldsCopy.userInformation, event.target.id)
            inputFieldsCopy["userInformation"][currentFieldIndex].defaultValue = event.target.value;
        } else {
            let currentFieldIndex = getFieldIndex(inputFieldsCopy.personalInformation, event.target.id);
            inputFieldsCopy["personalInformation"][currentFieldIndex].defaultValue = event.target.value;
        }

        this.setState({inputFields: inputFieldsCopy})
    }

    handleOnClick(event, {addNotification, clearAllNotifications}) {
        clearAllNotifications();
        let inputFieldsCopy = {...this.state.inputFields}

        let resultUserInformation = validateObligatoryFields(this.state.inputFields.userInformation);
        let resultPersonalInformation = validateObligatoryFields(this.state.inputFields.personalInformation);

        if(resultUserInformation.valid && resultPersonalInformation.valid) {

            let emailValue = getFieldValue(inputFieldsCopy.userInformation, "email").defaultValue;
            inputFieldsCopy.userInformation = updateField(inputFieldsCopy.userInformation, "email", "errorText", "");

            if(isEmailFormatValid(emailValue)){
                let passwordValue = getFieldValue(inputFieldsCopy.userInformation, "password").defaultValue;
                let confirmPasswordValue = getFieldValue(inputFieldsCopy.userInformation, "confirmPassword").defaultValue;
                let emailValue = getFieldValue(inputFieldsCopy.userInformation, "email").defaultValue;
                let confirmEmailValue = getFieldValue(inputFieldsCopy.userInformation, "confirmEmail").defaultValue;

                inputFieldsCopy.userInformation = updateField(inputFieldsCopy.userInformation, "email", "errorText", "");
                inputFieldsCopy.userInformation = updateField(inputFieldsCopy.userInformation, "password", "errorText", "");

                if(areFieldsEqual(passwordValue, confirmPasswordValue) && areFieldsEqual(emailValue, confirmEmailValue)) {
                    let userInformation = getUserFields(this.state.inputFields.userInformation);
                    let personalInformation = getUserFields(this.state.inputFields.personalInformation);
                    let user = {...userInformation, ...personalInformation};
                    
                    clearAllNotifications()
                    axios.post('https://lagunilla.herokuapp.com/api/users/', {user})
                    .then(function (response) {
                        window.location = './'
                    })
                    .catch(function (error) {
                        addNotification({type: NotificationTypes.DANGER, contentType: "text", message: error});
                    })
                } else {
                    inputFieldsCopy.userInformation = updateField(inputFieldsCopy.userInformation, "email", "errorText", "El email no es igual a su confirmación");
                    inputFieldsCopy.userInformation = updateField(inputFieldsCopy.userInformation, "password", "errorText", "La contraseña no es igual a su confirmación");

                    addNotification({type: NotificationTypes.DANGER, contentType: "text", message: "Verifique la información de los campos marcados en rojo"})
                }

            } else {
               inputFieldsCopy.userInformation = updateField(inputFieldsCopy.userInformation, "email", "errorText", "El formato del email es incorrecto");
               addNotification({type: NotificationTypes.DANGER, contentType: "text", message: "Verifique la información de los campos marcados en rojo"})
            }

        } else {
            this.setState({inputFields: {userInformation: resultUserInformation.fieldList, personalInformation: resultPersonalInformation.fieldList}})
            addNotification({type: NotificationTypes.DANGER, contentType: "text", message: "Ingrese la información de los campos marcados en rojo"})
        }

        this.setState({inputFields: {userInformation: inputFieldsCopy.userInformation, personalInformation: inputFieldsCopy.personalInformation}})
    }

  render() {
    return (
      <div className="UserForm row">
        <div className="col-xs-12 col-md-6 userColumn">
            <div className="row subtitle">Datos de usuario</div>
            <div className="row">
                <div className="col-xs-12 col-md-12">
                    {
                        this.state.inputFields.userInformation.map((item, key) => <InputFieldComponent key={key}
                                                                inputType={item.inputType} 
                                                                hintText={item.hintText}
                                                                floatingLabelText={item.floatingLabelText}
                                                                className={item.className}
                                                                id={item.id}
                                                                type={item.type}
                                                                errorText={item.errorText}
                                                                options={item.options}
                                                                defaultValue={item.defaultValue}
                                                                onChange={event => this.handleOnChange(event)}/>)
                    }
                </div>
            </div>
        </div>
        <div className="col-xs-12 col-md-6 userColumn">
            <div className="row subtitle">Datos personales</div>
            <div className="row">
                <div className="col-xs-12 col-md-12">
                    {
                        this.state.inputFields.personalInformation.map((item, key) => <InputFieldComponent key={key}
                                                                inputType={item.inputType} 
                                                                hintText={item.hintText}
                                                                floatingLabelText={item.floatingLabelText}
                                                                className={item.className}
                                                                id={item.id}
                                                                type={item.type}
                                                                errorText={item.errorText}
                                                                options={item.options}
                                                                defaultValue={item.defaultValue}
                                                                onChange={event => this.handleOnChange(event)}/>)
                    }
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

UserForm.displayName = 'UserForm'

export const mapDispatchToProps = dispatch => ({
  addNotification: notification => dispatch({type: constants.ADD_NOTIFICATION, notification}),
  clearAllNotifications: () => dispatch({type: constants.CLEAR_ALL_NOTIFICATIONS})
})

export default connect(null, mapDispatchToProps)(UserForm)