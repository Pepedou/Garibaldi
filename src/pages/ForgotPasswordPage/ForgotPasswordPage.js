import React, {Component, PropTypes} from 'react';
import LoginNavbar from '../../components/partials/nav-bars/login-nav-bar/LoginNavbar';
import DefaultButton from '../../components/ui/buttons/DefaultButton'
import {getForm, FormType} from '../../utils/forms/formUtils'
import NotificationComponent from '../../components/alerts/notifications/NotificationComponent'
import {NotificationTypes} from '../../components/alerts/notifications/NotificationTypes'
import {validateObligatoryFields, getFieldIndex, getFieldValue} from '../../utils/fieldValidations'
import InputFieldComponent from '../../components/ui/input-field/InputFieldComponent'
import LoaderComponent from '../../components/ui/loader/LoaderComponent'
import {connect} from 'react-redux'
import * as constants from '../../redux/constants'
import axios from 'axios'
import '../../Main.css';
import './ForgotPasswordPage.css';

class ForgotPassword extends Component {
  constructor(props)
  {
      super(props)
      this.state = {
        inputFields: getForm(FormType.NEW_PASSWORD)
      }
  }

  handleOnChange(event, index, value){
    let inputFieldsCopy = [...this.state.inputFields]
    let currentFieldIndex = getFieldIndex(inputFieldsCopy, event.target.id)
    inputFieldsCopy[currentFieldIndex].defaultValue = event.target.value;

    this.setState({inputFields: inputFieldsCopy})
}

  handleOnClick(event, {addNotification, clearAllNotifications, loading}){ 
    let inputFieldsCopy = [...this.state.inputFields]
    let result = validateObligatoryFields(this.state.inputFields);

    if(result.valid){
        clearAllNotifications();
        loading(true)
        let emailValue = getFieldValue(inputFieldsCopy, "email").defaultValue;
        axios.post(`https://lagunilla.herokuapp.com/api/resetPassword?email=${emailValue}`)
        .then(function (response) {
            window.location = './'
            loading(false)
        })
        .catch(function (error) {
            addNotification({type: NotificationTypes.DANGER, contentType: "text", message: error.message});
            loading(false)
        })
    } else {
        addNotification({type: NotificationTypes.DANGER, contentType: "text", message: "Ingrese la información de los campos marcados en rojo"})
    }
    this.setState({inputFields: result.fieldList})
  }
    
  render() {
    return (
      <div className="ForgotPassword row">
        <LoginNavbar/>
        <div className="row"><NotificationComponent/></div>
        {
            this.props.showLoader
            ? <div className="marginTop row"><center><LoaderComponent/></center></div>
            : <div className="row">
            <div className="col-xs-0 col-md-4"></div>
            <div className="col-xs-12 col-md-4">
                <div className="row marginTop">
                    <center>
                        <img src="" id="passwordLogo" alt=""/>
                    </center>
                </div>
                <div className="row marginTop">
                    <center>Recupera tu contraseña. Ingresa el correo electrónico con el que hayas registrado tu cuenta</center>
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
                                label="Recuperar Contraseña"
                                labelPosition="after"
                                floatStyle="center"
                                onTouchTap={event => this.handleOnClick(event, this.props)}
                                className="marginTop"
                                />
                        </center>
                    </div>
                </div>
            </div>
            <div className="col-xs-0 col-md-4"></div>
        </div>
        }
        
      </div>
    );
  }
}

ForgotPassword.displayName = 'ForgotPassword'

ForgotPassword.propTypes = {
    showLoader: PropTypes.bool,
    addNotification: PropTypes.func,
    clearAllNotifications: PropTypes.func,
    loading: PropTypes.func
}

export const mapStateToProps = ({showLoader}) => ({
  showLoader
})

export const mapDispatchToProps = dispatch => ({
  addNotification: notification => dispatch({type: constants.ADD_NOTIFICATION, notification}),
  clearAllNotifications: () => dispatch({type: constants.CLEAR_ALL_NOTIFICATIONS}),
  loading: showLoader => dispatch({type: constants.SHOW_LOADER, showLoader})
})

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
