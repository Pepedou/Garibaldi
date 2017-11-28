import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {validateObligatoryFields, getFieldIndex, getUserFields, getFieldValue, isEmailFormatValid, areFieldsEqual, updateField} from '../../../../utils/fieldValidations'
import DefaultButton from '../../../ui/buttons/DefaultButton'
import InputFieldComponent from '../../../ui/input-field/InputFieldComponent'
import {getForm, FormType} from '../../../../utils/forms/formUtils'
import {handleError, ERROR_CODES} from '../../../../utils/errorHandling'
import * as constants from '../../../../redux/constants'
import CredentialServices from '../../../../utils/services/credentialServices'
import { withRouter } from 'react-router'
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

    handleOnClick(event, {addNotification, clearAllNotifications, loading, router}) {
        event.preventDefault()
        clearAllNotifications()
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
                    let md5 = require('js-md5')
                    userInformation.password = md5(userInformation.password)
                    let user = {...userInformation, ...personalInformation};
                
                    loading(true)

                    CredentialServices.register(user)
                    .then(function (response) {
                        loading(false)
                        router.push('/')
                    })
                    .catch(function (error) {
                        loading(false)
                        addNotification(error)
                    })
                } else {
                    inputFieldsCopy.userInformation = updateField(inputFieldsCopy.userInformation, "email", "errorText", "El email no es igual a su confirmación");
                    inputFieldsCopy.userInformation = updateField(inputFieldsCopy.userInformation, "password", "errorText", "La contraseña no es igual a su confirmación");
                    addNotification({code: ERROR_CODES.CHECK_FIELDS.code})
                }

            } else {
               inputFieldsCopy.userInformation = updateField(inputFieldsCopy.userInformation, "email", "errorText", "El formato del email es incorrecto");
               addNotification({code: ERROR_CODES.CHECK_FIELDS.code})
            }

        } else {
            this.setState({inputFields: {userInformation: resultUserInformation.fieldList, personalInformation: resultPersonalInformation.fieldList}})
            addNotification({code: ERROR_CODES.CHECK_FIELDS.code})
        }

        this.setState({inputFields: {userInformation: inputFieldsCopy.userInformation, personalInformation: inputFieldsCopy.personalInformation}})
    }

  render() {
    return (
      <div className="UserForm row">
        <form onSubmit={event => this.handleOnClick(event, this.props)}>
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
                    type="submit"
                    />
            </div>
        </form>
    </div>
    );
  }
}

UserForm.propTypes = {
    addNotification: PropTypes.func,
    clearAllNotifications: PropTypes.func,
    loading: PropTypes.func
}

UserForm.displayName = 'UserForm'

export const mapDispatchToProps = dispatch => ({
  addNotification: notification => handleError(dispatch, notification),
  clearAllNotifications: () => dispatch({type: constants.CLEAR_ALL_NOTIFICATIONS}),
  loading: showLoader => dispatch({type: constants.SHOW_LOADER, showLoader})
})

export default withRouter(connect(null, mapDispatchToProps)(UserForm))