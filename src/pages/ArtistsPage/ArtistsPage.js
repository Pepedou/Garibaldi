import React, {Component} from 'react';
import SqueezeBox from '../../components/Squeezebox/Squeezebox';

export default class ArtistsPage extends Component {
    render() {
        // <Carousel items={items} active={0} ></Carousel>
        // const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        return (
            <div className="main-area">
                <SqueezeBox></SqueezeBox>        
            </div>
        );
    }
}