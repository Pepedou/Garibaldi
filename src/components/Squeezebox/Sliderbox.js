import React, {Component} from 'react';

export default class Sliderbox extends Component {
    render() {
        return (
            <li className={this.props.initialClass}>
                <a href="#0">
                    <img src={this.props.artist.profileImage} alt="Project Illustration" />
                    <div className="project-info">
                        <h2>{this.props.artist.name}</h2>
                        <p>{this.props.artist.subtitle}</p>
                    </div>
                </a>
            </li>
        );
    }
}