import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Navbar extends Component {
    render() {
        return (
            <div className="navbar navbar-default navbar-static-top">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        Artwork Archive
                    </Link>
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <Link to="/">Gallery</Link>
                        </li>
                        <li>
                            <Link to="/artists">Artists</Link>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}