import React, {Component} from 'react';

export default class Navbar extends Component {
    render() {
        return (
            <div className="navbar navbar-default navbar-static-top">
                <div className="container">
                    <a href="/" className="navbar-brand">
                        Artwork Archive
                    </a>
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <a href="#">Gallery</a>
                        </li>
                        <li>
                            <a href="#">Artists</a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}