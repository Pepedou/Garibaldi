import React, {Component} from 'react';
var $ = require('jquery');
var checkMQ = require('../../utils/browserClientCheck');

export default class SqueezeSliderBox extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        //TODO: Clean this Jquery references
        var projectsContainer = $('.cd-projects-wrapper'); // Squeezebox
        var projectsSlider = projectsContainer.children('.cd-slider'); // SqueezeSlider

        var mq = checkMQ();
        event.preventDefault();
        if ($(this).parent('li').next('li').is('.current') && (mq === 'desktop')) {
            // prevSides(projectsSlider);
            this.props.onPrevSidesClicked(projectsSlider);
        } else if ($(this).parent('li').prev('li').prev('li').prev('li').is('.current') && (mq === 'desktop')) {
            // nextSides(projectsSlider);
            this.props.onNextSidesClicked(projectsSlider);
        } else {
            this.props.onBoxClick(this.props.artist);
        }
    }

    render() {
        return (
            <li className={this.props.initialClass}>
                <a href="#0" onClick={this.handleClick}>
                    <img src={this.props.artist.profileImage} alt="Project Illustration"/>
                    <div className="project-info">
                        <h2>{this.props.artist.name}</h2>
                        <p>{this.props.artist.subtitle}</p>
                    </div>
                </a>
            </li>
        );
    }
}