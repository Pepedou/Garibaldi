import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import LoginNavbar from "./components/partials/nav-bars/login-nav-bar/LoginNavbar";
import LoginForm from "./components/partials/login-page/login-form/LoginForm";
import NotificationComponent from "./components/alerts/notifications/NotificationComponent";
import LoaderComponent from "./components/ui/loader/LoaderComponent";
import "./Main.css";

class Login extends Component {
  render() {
    return (
      <div className="Login row">
        <div className="col-xs-12 col-md-12">
          <LoginNavbar selectedOption="loginOption" />
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
            <LoginForm />
          )}
        </div>
      </div>
    );
  }
}

Login.displayName = "Login";

Login.propTypes = {
  showLoader: PropTypes.bool
};

export const mapStateToProps = ({ showLoader }) => ({
  showLoader
});

export default connect(mapStateToProps, null)(Login);
