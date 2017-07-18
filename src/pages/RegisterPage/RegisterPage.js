import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import LoginNavbar from '../../components/partials/nav-bars/login-nav-bar/LoginNavbar'
import UserForm from '../../components/partials/user-page/user-form/UserForm'
import DividerComponent from '../../components/ui/divider/DividerComponent'
import NotificationComponent from '../../components/alerts/notifications/NotificationComponent'
import LoaderComponent from '../../components/ui/loader/LoaderComponent'
import '../../Main.css'
import './RegisterPage.css'

class Register extends Component {
  render() {
    return (
      <div className="Register row">
        <div className="col-xs-12 col-md-12">
          <LoginNavbar selectedOption="registerOption"/>
          <div className="row"><NotificationComponent/></div>
          <div className="RegisterForm row">
              <div className="col-xs-0 col-md-3"></div>
              <div className="col-xs-12 col-md-6">
                  <div className="row marginTop">
                      <center>
                        <img src="" id="registerLogo" alt=""/>
                      </center>
                  </div>
                  <div className="row marginTop">
                      <center>Ingresa tus datos para empezar a usar Artchive</center>
                  </div>
                  <div className="row marginTop">
                    <DividerComponent />
                  </div>
                  {
                    this.props.showLoader
                    ? <div className="marginTop row"><center><LoaderComponent/></center></div>
                    : <UserForm/>
                  }
              </div>
              <div className="col-xs-0 col-md-3"></div>
          </div>
      </div>
    </div>
    );
  }
}

Register.displayName = 'Register'

Register.propTypes = {
    showLoader: PropTypes.bool
}

export const mapStateToProps = ({showLoader}) => ({
  showLoader
})

export default connect(mapStateToProps, null)(Register)