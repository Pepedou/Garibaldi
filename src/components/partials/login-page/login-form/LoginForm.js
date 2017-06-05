import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux'
import {validateObligatoryFields} from '../../../../utils/fieldValidations'
import DividerComponent from '../../../ui/divider/DividerComponent'
import DefaultButton from '../../../ui/buttons/DefaultButton'
import InputFieldComponent from '../../../input-field/InputFieldComponent'
import '../../../../Main.css'
import './LoginForm.css'

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
                    className: "obligatoryField"
                },
                {
                    inputType: "textField",
                    floatingLabelText: "Ingresa la contraseña",
                    hintText: "Contraseña",
                    name: "password",
                    type: "password",
                    className: "obligatoryField"
                }
            ]
        }
    }

    handleOnClick(event, addNotification){
        let username = document.getElementsByName("username");
        let password = document.getElementsByName("password");

        let valid = validateObligatoryFields();
        if(valid){
            //TODO: [BE] Validar el inicio de sesión
        } else {
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
                                 this.props.options.map((item, key) => <InputFieldComponent key={key}
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
                                    onTouchTap={event => this.handleOnClick(event, this.props.addNotification)}
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

export const mapDispatchToProps = dispatch => ({
  addNotification: notification => dispatch({type: "ADD_NOTIFICATION", notification})
})

export default connect(null, mapDispatchToProps)(LoginForm)