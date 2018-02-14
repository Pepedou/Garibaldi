import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SearchBar from '../../search-bar/SearchBar';
import {Link} from 'react-router';
import {UserTypes} from '../../../../utils/constants/UserTypes'
import './MainNavBar.css'

export default class MainNavBar extends Component {
    render() {
        let {currentUser, artistProfileClick} = this.props
        return (
            <div className="MainNavBar navbar navbar-default navbar-static-top">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-md-12">
                             <ul className="nav navbar-nav navbar-left">
                                <li>
                                    <Link to="/home" className="menu-item__file">Archivo</Link>
                                </li>
                                <li>
                                    {
                                        currentUser.ownerType === UserTypes.GESTOR_CULTURAL
                                        ? <Link to="/artists" className="menu-item__artists">Artistas</Link>
                                        : <Link onClick={artistProfileClick}>Perfil de artista</Link>
                                    }
                                </li>
                                <li>
                                    <Link to="/createTemplate" className="menu-item__templates">Plantillas</Link>
                                </li>
                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                                <li>
                                    <SearchBar {...this.props}/>
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
  currentUser: PropTypes.object,
  artistProfileClick: PropTypes.func
};