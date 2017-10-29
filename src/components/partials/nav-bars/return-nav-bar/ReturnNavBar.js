import React, {Component} from 'react';
import {Link} from 'react-router';
import './ReturnNavBar.css'

export default class ReturnNavBar extends Component {
    render() {
        return (
            <div className="ReturnNavBar navbar navbar-default navbar-static-top">
                <div className="container">
                    <div className="row">
                        <ul className="nav navbar-nav navbar-left">
                            <li>
                                {
                                    window.location.pathname === "/newArt"
                                    || window.location.pathname === "/myUserProfile"
                                    || window.location.pathname === "/createTemplate"
                                    || window.location.pathname === "/exportConfiguration"
                                    ? <Link to="/home">Regresar al Archivo</Link>
                                    : <Link to="/artists">Regresar a Artistas</Link>
                                }
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

ReturnNavBar.displayName = 'ReturnNavBar'