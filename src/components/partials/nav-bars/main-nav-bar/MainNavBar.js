import React, {Component, PropTypes} from 'react';
import SearchBar from '../../search-bar/SearchBar';
import {Link} from 'react-router';
import {UserTypes} from '../../../../utils/constants/UserTypes'
import './MainNavBar.css'

export default class MainNavBar extends Component {
    render() {
        return (
            <div className="MainNavBar navbar navbar-default navbar-static-top">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-md-4">
                             <ul className="nav navbar-nav navbar-left">
                                <li>
                                    <Link to="/home">Archivo</Link>
                                </li>
                                <li>
                                    {
                                        this.props.user.userType === UserTypes.GESTOR_CULTURAL
                                        ? <Link to="/artists">Artistas</Link>
                                        : <Link to="/artistProfile">Perfil de artista</Link>
                                    }
                                </li>
                            </ul>
                        </div>
                        <div className="col-xs-12 col-md-8">
                             <ul className="nav navbar-nav navbar-right">
                                <li>
                                    <SearchBar />
                                </li>
                            </ul>
                        </div>
                    </div>
                   
                </div>
            </div>
        );
    }
}

MainNavBar.displayName = 'MainNavBar'

MainNavBar.propTypes = {
  user: PropTypes.object
};