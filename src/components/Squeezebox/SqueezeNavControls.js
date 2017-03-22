import React, {Component} from 'react';

export default class SqueezeNavControls extends Component {
    render() {
        return (
            <ul className="cd-slider-navigation cd-img-replace">
                <li><a href="#0" className="prev inactive">Prev</a></li>
                <li><a href="#0" className="next">Next</a></li>
            </ul>
        );
    }
}