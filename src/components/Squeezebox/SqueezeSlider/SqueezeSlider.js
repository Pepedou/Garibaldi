import React, {Component} from 'react';
import SqueezeSlideBox from '../SqueezeSlideBox/SqueezeSlideBox';

export default class SqueezeSlider extends Component {
    constructor(props){
        super(props);
        this.state = {
            boxes: [
                {title: 'Project 1', description: 'Lorem ipsum dolor sit amet.'},
                {title: 'Project 2', description: 'Lorem ipsum dolor sit amet.'},
                {title: 'Project 3', description: 'Lorem ipsum dolor sit amet.'},
                {title: 'Project 4', description: 'Lorem ipsum dolor sit amet.'},
                {title: 'Project 5', description: 'Lorem ipsum dolor sit amet.'},
                {title: 'Project 6', description: 'Lorem ipsum dolor sit amet.'},
                {title: 'Project 7', description: 'Lorem ipsum dolor sit amet.'},
            ]
        }
    }

    buildSlideBoxes(){
        return this.state.boxes.map((box, i) => {
            return <SqueezeSlideBox key={i} {...box} />
        });
    }

    render() {
        const slideBoxes = this.buildSlideBoxes();

        return (
            <div className="cd-projects-wrapper">
                <ul className="cd-slider">
                    {slideBoxes}
                </ul>
                <ul className="cd-slider-navigation cd-img-replace">
                    <li><a href="#0" className="prev inactive">Prev</a></li>
                    <li><a href="#0" className="next">Next</a></li>
                </ul>
	        </div>
        );
    }
}