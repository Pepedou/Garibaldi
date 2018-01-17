import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {getForm, FormType} from '../../utils/forms/formUtils'
import DefaultButton from '../../components/ui/buttons/DefaultButton'
import InputFieldComponent from '../../components/ui/input-field/InputFieldComponent'
import DividerComponent from '../../components/ui/divider/DividerComponent'
import * as constants from '../../redux/constants'
import {handleError, ERROR_CODES} from '../../utils/errorHandling'
import LoaderComponent from '../../components/ui/loader/LoaderComponent'
import {getTypeName} from '../../utils/constants/UserTypes'
import {validateObligatoryFields, getFieldIndex, getUserFields, getFieldValue} from '../../utils/fieldValidations'
import CredentialServices from '../../utils/services/credentialServices'

require('./UserProfilePage.css')

class UserProfilePage extends Component {
    constructor(props)
    {
        super(props)

        this.state = {
            inputFields: []
        }
    }

    updateToggleValue(toggleValue) {
        let inputFieldsCopy = {...this.state.inputFields}
        inputFieldsCopy.personalLeftInformation[getFieldIndex(inputFieldsCopy.personalLeftInformation, 'active')].defaultToggled = toggleValue
        this.setState({inputFields: inputFieldsCopy})
    }

    updateFields(data, inputFields, setState){
        let inputFieldsCopy = getForm(FormType.USER_PROFILE)

        inputFieldsCopy.personalLeftInformation[getFieldIndex(inputFieldsCopy.personalLeftInformation, 'name')].defaultValue = data.name
        inputFieldsCopy.personalLeftInformation[getFieldIndex(inputFieldsCopy.personalLeftInformation, 'lastName')].defaultValue = data.lastName
        inputFieldsCopy.personalLeftInformation[getFieldIndex(inputFieldsCopy.personalLeftInformation, 'birthDate')].defaultValue = data.birthDate
        inputFieldsCopy.personalLeftInformation[getFieldIndex(inputFieldsCopy.personalLeftInformation, 'active')].defaultToggled = data.active
        inputFieldsCopy.personalRightInformation[getFieldIndex(inputFieldsCopy.personalRightInformation, 'address1')].defaultValue = data.address1
        inputFieldsCopy.personalRightInformation[getFieldIndex(inputFieldsCopy.personalRightInformation, 'address2')].defaultValue = data.address2
        inputFieldsCopy.personalRightInformation[getFieldIndex(inputFieldsCopy.personalRightInformation, 'city')].defaultValue = data.city
        inputFieldsCopy.personalRightInformation[getFieldIndex(inputFieldsCopy.personalRightInformation, 'state')].defaultValue = data.state
        inputFieldsCopy.personalRightInformation[getFieldIndex(inputFieldsCopy.personalRightInformation, 'country')].defaultValue = data.country

        setState({inputFields: inputFieldsCopy})
    }

    componentWillMount() {
        let updateFields = this.updateFields
        let {addNotification, currentUser} = this.props
        let setState = this.setState.bind(this)
        let {inputFields} = this.state
        
        CredentialServices.getById(currentUser.id)
        .then(function (response) {
            updateFields(response, inputFields, setState)
        })
        .catch(function (error) {
            addNotification(error)
        })
    }

    handleOnChange(event, index, value){
        let inputFieldsCopy = {...this.state.inputFields}
        let className = document.getElementById(event.target.id).parentElement.className
        
        if(className.indexOf("personalLeftInformation") !== -1) {
            let currentFieldIndex = getFieldIndex(inputFieldsCopy.personalLeftInformation, event.target.id)
            inputFieldsCopy["personalLeftInformation"][currentFieldIndex].defaultValue = event.target.value;
        } else {
            let currentFieldIndex = getFieldIndex(inputFieldsCopy.personalRightInformation, event.target.id);
            inputFieldsCopy["personalRightInformation"][currentFieldIndex].defaultValue = event.target.value;
        }

        this.setState({inputFields: inputFieldsCopy})
    }

    handleSaveUser(event, props) {
        let {loading, currentUser, addNotification, clearAllNotifications, receiveCurrentUser} = props

        clearAllNotifications()

        let personalLeftInformation = validateObligatoryFields(this.state.inputFields.personalLeftInformation)
        let personalRightInformation = validateObligatoryFields(this.state.inputFields.personalRightInformation)

        if(personalLeftInformation.valid && personalRightInformation.valid) {
            let personalLeftInformation = getUserFields(this.state.inputFields.personalLeftInformation)
            let personalRightInformation = getUserFields(this.state.inputFields.personalRightInformation)
            let user = {...personalLeftInformation, ...personalRightInformation}
            user.active = getFieldValue(this.state.inputFields.personalLeftInformation, "active").defaultToggled;

            loading(true)
            CredentialServices.update(currentUser.id, user)
            .then(function (response) {
                loading(false)
                receiveCurrentUser(response)
            })
            .catch(function (error) {
                addNotification(error)
                loading(false)
            })
        } else {
            this.setState({inputFields: {personalLeftInformation: personalLeftInformation.fieldList, personalRightInformation: personalRightInformation.fieldList, passwordField: this.state.inputFields.passwordField}})
            addNotification({code: ERROR_CODES.CHECK_FIELDS.code})
        }
    }

    handlePasswordOnChange(event, index, value){
        let inputFieldsCopy = {...this.state.inputFields}
        let currentFieldIndex = getFieldIndex(inputFieldsCopy.passwordField, event.target.id)
        inputFieldsCopy["passwordField"][currentFieldIndex].defaultValue = event.target.value;

        this.setState({inputFields: inputFieldsCopy})
    }

    handleChangePassword(event, props) {
        let {loading, addNotification, clearAllNotifications, currentUser} = props

        clearAllNotifications()

        let passwordFields = validateObligatoryFields(this.state.inputFields.passwordField)

        if(passwordFields.valid) {
            let passwordValues = getUserFields(this.state.inputFields.passwordField)
            let md5 = require('js-md5')
            passwordValues.newPassword = md5(passwordValues.newPassword)
            passwordValues.oldPassword = md5(passwordValues.oldPassword)
            passwordValues.id = currentUser.id

            loading(true)

            CredentialServices.changePassword(passwordValues)
            .then(function (response) {
                window.location.reload()
            })
            .catch(function (error) {
                addNotification(error)
            })
        } else {
            this.setState({inputFields: {personalLeftInformation: this.state.inputFields.personalLeftInformation, personalRightInformation: this.state.inputFields.personalRightInformation, passwordField: passwordFields.fieldList}})
            addNotification({code: ERROR_CODES.CHECK_FIELDS.code})
        }
    }

    render() {
        let {showLoader, currentUser} = this.props
        return (this.state.inputFields.length === 0 || showLoader
                ? <div className="marginTop row"><center><LoaderComponent/></center></div>
                : <div className="col-xs-12 col-md-12 UserProfilePage">
                    <div className="row">
                        <div className="col-xs-12 col-md-6 userProfileColumn">
                            <div className="row subtitle">Datos del usuario</div>
                            <div className="row">
                                <div className="userLabel">Email: </div>
                                <div className="userValue">{currentUser.email}</div>
                            </div>
                            <div className="row">
                                <div className="userLabel">Tipo de usuario: </div>
                                <div className="userValue">{getTypeName(currentUser.ownerType)}</div>
                            </div>
                            <div className="row">
                                {
                                    this.state.inputFields.personalLeftInformation.map((item, key) => <InputFieldComponent key={key}
                                                                            inputType={item.inputType} 
                                                                            hintText={item.hintText}
                                                                            floatingLabelText={item.floatingLabelText}
                                                                            className={item.className}
                                                                            id={item.id}
                                                                            type={item.type}
                                                                            errorText={item.errorText}
                                                                            defaultValue={item.defaultValue}
                                                                            labelOnTrue={item.labelOnTrue}
                                                                            labelOnFalse={item.labelOnFalse}
                                                                            defaultToggled={item.defaultToggled}
                                                                            onToggle={this.updateToggleValue.bind(this)}
                                                                            onChange={event => this.handleOnChange(event)}/>)
                                }
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-6 userProfileColumn">
                            <div className="row subtitle">Datos del domicilio</div>
                            {
                                this.state.inputFields.personalRightInformation.map((item, key) => <InputFieldComponent key={key}
                                                                        inputType={item.inputType} 
                                                                        hintText={item.hintText}
                                                                        floatingLabelText={item.floatingLabelText}
                                                                        className={item.className}
                                                                        id={item.id}
                                                                        type={item.type}
                                                                        errorText={item.errorText}
                                                                        defaultValue={item.defaultValue}
                                                                        onChange={event => this.handleOnChange(event)}/>)
                            }
                        </div>
                        <div className="row">
                            <DefaultButton
                                label="Guardar Usuario"
                                labelPosition="after"
                                floatStyle="right"
                                onTouchTap={event => this.handleSaveUser(event, this.props)}
                                />
                        </div>
                    </div>
                    <div className="row divider">
                        <DividerComponent />
                    </div>
                    <div className="row subtitle">Cambiar contraseña</div>
                    <center>
                        <div className="row">
                            <div className="col-xs-12 col-md-12 passwordColumn">
                                {
                                    this.state.inputFields.passwordField.map((item, key) => <InputFieldComponent key={key}
                                                                            inputType={item.inputType} 
                                                                            hintText={item.hintText}
                                                                            floatingLabelText={item.floatingLabelText}
                                                                            className={item.className}
                                                                            id={item.id}
                                                                            type={item.type}
                                                                            errorText={item.errorText}
                                                                            defaultValue={item.defaultValue}
                                                                            onChange={event => this.handlePasswordOnChange(event)}/>)
                                }
                            </div>
                        </div>
                        <div className="row">
                            <DefaultButton
                                label="Cambiar contraseña"
                                labelPosition="after"
                                floatStyle="center"
                                onTouchTap={event => this.handleChangePassword(event, this.props)}
                                />
                        </div>
                    </center>
                </div>
        );
    }
}

UserProfilePage.displayName = 'UserProfilePage'

UserProfilePage.propTypes = {
    currentUser: PropTypes.object,
    addNotification: PropTypes.func,
    clearAllNotifications: PropTypes.func,
    loading: PropTypes.func,
    receiveCurrentUser: PropTypes.func
}

export const mapStateToProps = ({currentUser, showLoader}) => ({
  currentUser, showLoader
})

export const mapDispatchToProps = dispatch => ({
  addNotification: notification => handleError(dispatch, notification),
  clearAllNotifications: () => dispatch({type: constants.CLEAR_ALL_NOTIFICATIONS}),
  loading: showLoader => dispatch({type: constants.SHOW_LOADER, showLoader}),
  receiveCurrentUser: user => dispatch({type: constants.CURRENT_USER_RECIEVED, user})
})

export default connect(mapStateToProps, mapDispatchToProps)(UserProfilePage)