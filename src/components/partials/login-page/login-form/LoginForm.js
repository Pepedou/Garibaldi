import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux'
import {validateObligatoryFields} from '../../../../utils/fieldValidations'
import DividerComponent from '../../../ui/divider/DividerComponent'
import DefaultButton from '../../../ui/buttons/DefaultButton'
import InputFieldComponent from '../../../ui/input-field/InputFieldComponent'
import * as constants from '../../../../redux/constants'
import '../../../../Main.css'
import './LoginForm.css'
import axios from 'axios'

class LoginForm extends Component {
    constructor(props)
    {
        super(props)

        this.state = {
            inputFields: [
                {
                    inputType: "textField",
                    floatingLabelText: "Nombre de usuario",
                    hintText: "Ingresa el nombre de usuario",
                    name: "username",
                    type: "text",
                    className: "obligatoryField",
                    value: ""
                },
                {
                    inputType: "textField",
                    floatingLabelText: "Ingresa la contraseña",
                    hintText: "Contraseña",
                    name: "password",
                    type: "password",
                    className: "obligatoryField",
                    value: ""
                }
            ]
        }
    }

    handleOnClick(event, {addNotification, clearAllNotifications, receiveCurrentUser}){
        clearAllNotifications();
        let result = validateObligatoryFields(this.state.inputFields);
        if(result.valid){
            axios.get('api/mosaic')
            .then(function (response) {
                receiveCurrentUser(response.data)
            })
            .catch(function (error) {
                addNotification(error);
            });
        } else {
            this.setState({inputFields: result.fieldList})
            addNotification("Ingrese la información de los campos marcados en rojo")
        }
    }

    render() {
        return (
        <div className="LoginForm">
            <div className="Row">
                <div className="col-xs-0 col-md-4"></div>
                <div className="col-xs-12 col-md-4">
                    <div className="row marginTop">
                        <center>
                            <img src="" id="mainLogo" />
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
                                                                         name={item.name}
                                                                         className={item.className}
                                                                         type={item.type}
                                                                         fieldErrorMessage={item.fieldErrorMessage}/>)
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
                    <div className="row marginTop">
                        <center><Link to="/forgotPassword" id="forgotPasswordBtn">¿Olvidaste tu nombre de usuario o contraseña?</Link></center>
                    </div>
                </div>
                <div className="col-xs-0 col-md-4"></div>
            </div>
        </div>
        );
  }
}

LoginForm.displayName = 'LoginForm'

LoginForm.propTypes = {
  addNotification: PropTypes.func,
  clearAllNotifications: PropTypes.func,
  receiveCurrentUser: PropTypes.func
};

export const mapDispatchToProps = dispatch => ({
  addNotification: notification => dispatch({type: constants.ADD_NOTIFICATION, notification}),
  clearAllNotifications: () => dispatch({type: constants.CLEAR_ALL_NOTIFICATIONS}),
  receiveCurrentUser: user => dispatch({type: constants.CURRENT_USER_RECIEVED, user})
})

export default connect(null, mapDispatchToProps)(LoginForm)