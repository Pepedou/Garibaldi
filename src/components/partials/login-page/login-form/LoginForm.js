import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router';
import {connect} from 'react-redux'
import {validateObligatoryFields, getFieldValue, getFieldIndex} from '../../../../utils/fieldValidations'
import DividerComponent from '../../../ui/divider/DividerComponent'
import DefaultButton from '../../../ui/buttons/DefaultButton'
import InputFieldComponent from '../../../ui/input-field/InputFieldComponent'
import * as constants from '../../../../redux/constants'
import '../../../../Main.css'
import './LoginForm.css'
import axios from 'axios'
import {getForm, FormType} from '../../../../utils/forms/formUtils'
import {NotificationTypes} from '../../../alerts/notifications/NotificationTypes'

class LoginForm extends Component {
    constructor(props)
    {
        super(props)

        this.state = {
            inputFields: getForm(FormType.LOGIN)
        }
    }

    handleOnChange(event, index, value){
        let inputFieldsCopy = [...this.state.inputFields]
        let currentFieldIndex = getFieldIndex(inputFieldsCopy, event.target.id)
        inputFieldsCopy[currentFieldIndex].defaultValue = event.target.value

        this.setState({inputFields: inputFieldsCopy})
    }

    handleOnClick(event, {addNotification, clearAllNotifications, receiveCurrentUser}){
        clearAllNotifications();
        let inputFieldsCopy = [...this.state.inputFields]
        let result = validateObligatoryFields(this.state.inputFields)

        if(result.valid){
            let usernameValue = getFieldValue(inputFieldsCopy, "username").defaultValue
            let passwordValue = getFieldValue(inputFieldsCopy, "password").defaultValue
            
            // this.props.clearAllNotifications()
            // axios.get('api/mosaic')
            // .then(function (response) {
            //     sessionStorage.setItem('currentUser', response.data);
            // })
            // .catch(function (error) {
            //     this.props.addNotification({type: NotificationTypes.DANGER, contentType: "text", message: error});
            // })
            sessionStorage.setItem('currentUser', "test");
            receiveCurrentUser({test: "test"})
            window.location = './home'
        } else {
            addNotification({type: NotificationTypes.DANGER, contentType: "text", message: "Ingrese la información de los campos marcados en rojo"})
        }
        this.setState({inputFields: result.fieldList})
    }

    render() {
        return (
        <div className="LoginForm row">
            <div className="col-xs-0 col-md-4"></div>
            <div className="col-xs-12 col-md-4">
                <div className="row marginTop">
                    <center>
                        <img src="" id="mainLogo" alt=""/>
                    </center>
                </div>
                <div className="row marginTop">
                    <center>Entra ya y empieza a descubrir arte, artistas y galerías.</center>
                </div>
                <div className="row marginTop">
                    <div className="form-group">
                        {
                                this.state.inputFields.map((item, key) => <InputFieldComponent key={key}
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
                        <center>
                            <DefaultButton
                                label="Iniciar Sesión"
                                labelPosition="after"
                                floatStyle="center"
                                onTouchTap={event => this.handleOnClick(event, this.props)}
                                className="marginTop"
                                />
                        </center>
                    </div>
                </div>
                <div className="row marginTop">
                    <DividerComponent />
                </div>
                <div className="row marginTop marginBottom">
                    <center><Link to="/forgotPassword" id="forgotPasswordBtn">¿Olvidaste tu nombre de usuario o contraseña?</Link></center>
                </div>
            </div>
            <div className="col-xs-0 col-md-4"></div>
        </div>
        );
  }
}

LoginForm.displayName = 'LoginForm'

LoginForm.propTypes = {
  addNotification: PropTypes.func,
  clearAllNotifications: PropTypes.func,
  receiveCurrentUser: PropTypes.func
}

export const mapDispatchToProps = dispatch => ({
  addNotification: notification => dispatch({type: constants.ADD_NOTIFICATION, notification}),
  clearAllNotifications: () => dispatch({type: constants.CLEAR_ALL_NOTIFICATIONS}),
  receiveCurrentUser: user => dispatch({type: constants.CURRENT_USER_RECIEVED, user})
})

export default connect(null, mapDispatchToProps)(LoginForm)