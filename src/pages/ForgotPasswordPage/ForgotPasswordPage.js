import React, {Component} from 'react';
import LoginNavbar from '../../components/partials/nav-bars/login-nav-bar/LoginNavbar';
import TextFieldComponent from '../../components/ui/text-field/TextFieldComponent'
import DefaultButton from '../../components/ui/buttons/DefaultButton'
import '../../Main.css';

export default class ForgotPassword extends Component {
  constructor(props)
  {
      super(props)
      this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(event){ 
  }
    
  render() {
    return (
      <div className="ForgotPassword container-fluid degraded-container">
        <LoginNavbar/>
        <div className="">
            <div className="Row">
                <div className="col-xs-0 col-md-4"></div>
                <div className="col-xs-12 col-md-4">
                    <div className="row marginTop">
                        <center>Aqui va el logo</center>
                    </div>
                    <div className="row marginTop">
                        <center>Recupera tu contraseña. Ingresa el correo electrónico con el que hayas registrado tu cuenta</center>
                    </div>
                    <div className="row marginTop">
                        <div className="form-group">
                            <TextFieldComponent
                                hintText="Ingresa tu correo electrónico"
                                floatingLabelText="Correo electrónico"
                                name="email"
                                type="text"
                                className="obligatoryField"
                                />
                            <center>
                                <DefaultButton
                                    label="Recuperar Contraseña"
                                    labelPosition="after"
                                    floatStyle="center"
                                    onTouchTap={this.handleOnClick}
                                    className="marginTop"
                                    />
                            </center>
                        </div>
                    </div>
                </div>
                <div className="col-xs-0 col-md-4"></div>
            </div>
        </div>
      </div>
    );
  }
}
