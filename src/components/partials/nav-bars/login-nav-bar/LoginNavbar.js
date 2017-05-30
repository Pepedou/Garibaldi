import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import './LoginNavbar.css';

export default class LoginNavbar extends Component {
    componentDidMount(){
        if(this.props.selectedOption){
            document.getElementById(this.props.selectedOption).style.fontWeight = "bold";
        }
    }

    render() {
        return (
            <div className="LoginNavbar">
                <div className="row">
                    <div className="col-xs-12 col-md-4">
                        <Link to="/" className="loginOption" id="loginOption">Iniciar sesión</Link>
                        <Link to="/register" className="loginOption" id="registerOption">Regístrate</Link>
                    </div>
                    <div className="col-xs-12 col-md-4">
                        <center>
                            <img src="" alt="" id="whiteNavLogo"/>
                        </center>
                    </div>
                    <div className="col-xs-12 col-md-4"></div>
                </div>
            </div> 
        );
    }
}

LoginNavbar.propTypes = {
    selectedOption: PropTypes.string
};