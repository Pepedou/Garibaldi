import React, {Component} from 'react';

export default class SqueezeNavControls extends Component {

    //go to next/pre slide - keyboard navigation
    // $(document).keyup(function(event){
    //     var mq = checkMQ();
    //     if(event.which ==='37' && !(sliderNav.find('.prev').hasClass('inactive')) && (mq === 'desktop') ) {
    //         prevSides(projectsSlider);
    //     } else if( event.which ==='39' && !(sliderNav.find('.next').hasClass('inactive')) && (mq === 'desktop') ) {
    //         nextSides(projectsSlider);
    //     } else if(event.which ==='27' && singleProjectContent.hasClass('is-visible')) {
    //         singleProjectContent.removeClass('is-visible');
    //     }
    // });

    render() {
        return (
            <ul className="cd-slider-navigation cd-img-replace">
                <li>
                    <a href="#0" className="prev inactive" onClick={this.props.handlePreviousClick}>Prev</a>
                </li>
                <li>
                    <a href="#0" className="next" onClick={this.props.handleNextClick}>Next</a>
                </li>
            </ul>
        );
    }
}