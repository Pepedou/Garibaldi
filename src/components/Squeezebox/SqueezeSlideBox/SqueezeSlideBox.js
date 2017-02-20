import React, {Component} from 'react';

export default class SqueezeSlideBox extends Component {
    render() {
        return (
            <li>
                <a href="#0">
                    <img className="sliderbox" alt="project" />
                    <div className="project-info">
                        <h2>{this.props.title}</h2>
                        <p>{this.props.description}</p>
                    </div>
                </a>
            </li>
        );
    }
}