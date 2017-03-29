import React, {Component} from 'react';
import SqueezeSliderBox from './SqueezeSliderBox';

export default class SqueezeSlider extends Component {

    // projectsSlider.on('swipeleft', function(){
    //     var mq = checkMQ();
    //     if( !(sliderNav.find('.next').hasClass('inactive')) && (mq === 'desktop') ) nextSides(projectsSlider);
    // });

    // projectsSlider.on('swiperight', function(){
    //     var mq = checkMQ();
    //     if ( !(sliderNav.find('.prev').hasClass('inactive')) && (mq === 'desktop') ) prevSides(projectsSlider);
    // });

    render() {
        return (
            <ul className="cd-slider">
                {this.props.elements.map((p, index) => {
                        var firstClassName = index === 0 ? 'current' : '';
                        return <SqueezeSliderBox
                            key={index}
                            initialClass={firstClassName}
                            artist={p}
                            onPrevSidesClicked={this.props.onPrevSidesClicked}
                            onNextSidesClicked={this.props.onNextSidesClicked}
                            onBoxClick={this.props.onBoxClick}/>;
                    })}
            </ul>
        );
    }
}