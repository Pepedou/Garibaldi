import React, { Component } from "react";
import PropTypes from "prop-types";
import DefaultButton from "../../components/ui/buttons/DefaultButton";
import { getForm, FormType } from "../../utils/forms/formUtils";
import NotificationComponent from "../../components/alerts/notifications/NotificationComponent";
import {
  validateObligatoryFields,
  getFieldIndex,
  getFieldValue
} from "../../utils/fieldValidations";
import InputFieldComponent from "../../components/ui/input-field/InputFieldComponent";
import LoaderComponent from "../../components/ui/loader/LoaderComponent";
import { handleError, ERROR_CODES } from "../../utils/errorHandling";
import { connect } from "react-redux";
import * as constants from "../../redux/constants";
import images from "../../content/images/exportImages";
import { withRouter } from "react-router";
import "../../Main.css";
import "./ResetPasswordPage.css";
import CredentialServices from "../../utils/services/credentialServices";

class ResetPasswordPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputFields: getForm(FormType.RESET_PASSWORD)
    };
  }

  handleOnChange(event, index, value) {
    let inputFieldsCopy = [...this.state.inputFields];
    let currentFieldIndex = getFieldIndex(inputFieldsCopy, event.target.id);
    inputFieldsCopy[currentFieldIndex].defaultValue = event.target.value;

    this.setState({ inputFields: inputFieldsCopy });
  }

  handleOnClick(
    event,
    { addNotification, clearAllNotifications, loading, params, router }
  ) {
    event.preventDefault();
    let inputFieldsCopy = [...this.state.inputFields];
    let result = validateObligatoryFields(this.state.inputFields);
    clearAllNotifications();
    if (result.valid) {
      loading(true);
      let newPasswordValue = getFieldValue(inputFieldsCopy, "newPassword")
        .defaultValue;
      let newPassword = { newPassword: newPasswordValue };
      let accessToken = params.accessToken;

      CredentialServices.resetPassword(newPassword, accessToken)
        .then(function(response) {
          loading(false);
          router.push("/");
        })
        .catch(function(error) {
          loading(false);
          addNotification(error);
        });
    } else {
      addNotification({ code: ERROR_CODES.REQUIRED_FIELDS.code });
    }
    this.setState({ inputFields: result.fieldList });
  }

  render() {
    return (
      <div className="ResetPassword row">
        <div className="row">
          <NotificationComponent />
        </div>
        {this.props.showLoader ? (
          <div className="marginTop row">
            <center>
              <LoaderComponent />
            </center>
          </div>
        ) : (
          <div className="row">
            <div className="col-xs-0 col-md-4" />
            <div className="col-xs-12 col-md-4 ResetPasswordMain">
              <div className="row marginTop">
                <center>
                  <img src={images.gray_logo} id="passwordLogo" alt="" />
                </center>
              </div>
              <div className="row marginTop">
                <center>Ingrese la nueva contraseña</center>
              </div>
              <div className="row marginTop">
                <div className="form-group">
                  <form
                    onSubmit={event => this.handleOnClick(event, this.props)}
                  >
                    {this.state.inputFields.map((item, key) => (
                      <InputFieldComponent
                        key={key}
                        inputType={item.inputType}
                        hintText={item.hintText}
                        floatingLabelText={item.floatingLabelText}
                        className={item.className}
                        id={item.id}
                        type={item.type}
                        errorText={item.errorText}
                        options={item.options}
                        defaultValue={item.defaultValue}
                        onChange={event => this.handleOnChange(event)}
                      />
                    ))}
                    <center>
                      <DefaultButton
                        label="Cambiar Contraseña"
                        labelPosition="after"
                        floatStyle="center"
                        className="marginTop"
                        type="submit"
                      />
                    </center>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-xs-0 col-md-4" />
          </div>
        )}
      </div>
    );
  }
}

ResetPasswordPage.displayName = "ResetPasswordPage";

ResetPasswordPage.propTypes = {
  showLoader: PropTypes.bool,
  addNotification: PropTypes.func,
  clearAllNotifications: PropTypes.func,
  loading: PropTypes.func
};

export const mapStateToProps = ({ showLoader }) => ({
  showLoader
});

export const mapDispatchToProps = dispatch => ({
  addNotification: notification => handleError(dispatch, notification),
  clearAllNotifications: () =>
    dispatch({ type: constants.CLEAR_ALL_NOTIFICATIONS }),
  loading: showLoader => dispatch({ type: constants.SHOW_LOADER, showLoader })
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ResetPasswordPage)
);
