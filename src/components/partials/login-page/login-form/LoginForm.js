import React, {Component} from 'react';
import {Link} from 'react-router';
import {validateObligatoryFields} from '../../../../utils/fieldValidations'
import TextFieldComponent from '../../../ui/text-field/TextFieldComponent'
import DividerComponent from '../../../ui/divider/DividerComponent'
import DefaultButton from '../../../ui/buttons/DefaultButton'
import '../../../../Main.css'
import './LoginForm.css'

export default class LoginForm extends Component {
    constructor(props)
    {
        super(props)
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick(event){
        let username = document.getElementsByName("username");
        let password = document.getElementsByName("password");

        let valid = validateObligatoryFields();
        if(valid){
            this.setState = ({fieldErrorMessage: ""}, this.forceUpdate)
            //TODO: [BE] Validar el inicio de sesión
        } else {
            this.setState = ({fieldErrorMessage: "Campo obligatorio"}, this.render)
        }
    }

    render() {
        return (
        <div className="LoginForm">
            <div className="Row">
                <div className="col-xs-0 col-md-4"></div>
                <div className="col-xs-12 col-md-4">
                    <div className="row marginTop">
                        <center>Aqui va el logo</center>
                    </div>
                    <div className="row marginTop">
                        <center>Entra ya y empieza a descubrir arte, artistas y galerías.</center>
                    </div>
                    <div className="row marginTop">
                        <div className="form-group">
                            <TextFieldComponent
                                hintText="Ingresa el nombre de usuario"
                                floatingLabelText="Nombre de usuario"
                                name="username"
                                type="text"
                                className="obligatoryField"
                                />
                            <TextFieldComponent
                                hintText="Ingresa la contraseña"
                                floatingLabelText="Contraseña"
                                name="password"
                                type="password"
                                className="obligatoryField"
                                />
                            <center>
                                <DefaultButton
                                    label="Iniciar Sesión"
                                    labelPosition="after"
                                    floatStyle="center"
                                    onTouchTap={this.handleOnClick}
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