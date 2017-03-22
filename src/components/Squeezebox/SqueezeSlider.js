import React, {Component} from 'react';
import SqueezeSliderBox from './SqueezeSliderBox';

export default class SqueezeSlider extends Component {
    render() {
        return (
            <ul className="cd-slider">
                {this.props.elements.map((p, index) => {
                    var firstClassName = index === 0 ? 'current' : '';
                    return <SqueezeSliderBox key={index} initialClass={firstClassName} artist={p} />;
                })}
            </ul>
        );
    }
}