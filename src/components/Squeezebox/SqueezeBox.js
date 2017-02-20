import React, {Component} from 'react';
import SqueezeIntroBox from './SqueezeIntroBox/SqueezeIntroBox';
import SqueezeSlider from './SqueezeSlider/SqueezeSlider';
import SqueezeContent from './SqueezeContent/SqueezeContent';
import './reset.css';
import './style.css';

export default class SqueezeBox extends Component {
    render() {
        return (
            <div className="squeezeBox">
                <SqueezeIntroBox />
                <SqueezeSlider />
                <SqueezeContent />
            </div>
        );
    }
}