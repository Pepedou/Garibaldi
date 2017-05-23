import React, {Component} from 'react';
import {Link} from 'react-router';
import {validateObligatoryFields} from '../../utils/fieldValidations'
import TextField from 'material-ui/TextField';
import '../../Main.css';
import './LoginForm.css';
import {grey500, grey300} from 'material-ui/styles/colors';

const styles = {
  underlineStyle: {
    borderColor: grey300,
  },
  underlineFocusStyle:{
    borderColor: grey500,
  },
  floatingLabelStyle: {
    color: grey300,
  },
  floatingLabelFocusStyle: {
    color: grey500,
  },
};

export default class LoginForm extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            fieldErrorMessage: ""
        }
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnClick(event){
        event.preventDefault()
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

    handleOnChange(event){
        event.preventDefault()
        if(event.target.value === ""){
            this.setState = {fieldErrorMessage: "Campo obligatorio"}
        }else {
            this.setState = {fieldErrorMessage: ""}
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
                            <TextField
                                hintText="Ingresa el nombre de usuario"
                                errorText={this.state.fieldErrorMessage}
                                floatingLabelText="Nombre de usuario"
                                fullWidth={true}
                                name="username"
                                className="obligatoryField"
                                onChange={this.handleOnChange}
                                underlineStyle={styles.underlineStyle}
                                floatingLabelStyle={styles.floatingLabelStyle}
                                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                underlineFocusStyle={styles.underlineFocusStyle}
                                />
                            <TextField
                                hintText="Ingresa la contraseña"
                                errorText={this.state.fieldErrorMessage}
                                floatingLabelText="Contraseña"
                                fullWidth={true}
                                name="password"
                                className="obligatoryField"
                                onChange={this.handleOnChange}
                                underlineStyle={styles.underlineStyle}
                                floatingLabelStyle={styles.floatingLabelStyle}
                                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                underlineFocusStyle={styles.underlineFocusStyle}
                                />
                            <center>
                                <button type="button" className="btn btn-default marginTop" onClick={this.handleOnClick} id="loginBtn">Iniciar Sesión</button>
                            </center>
                        </div>
                    </div>
                    <div className="row divider marginTop"></div>
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