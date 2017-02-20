import React, {Component} from 'react';
import SqueezeBox from '../../components/Squeezebox/SqueezeBox';

export default class GalleryPage extends Component {
    render() {
        return (
            <div className="main-area">
                <SqueezeBox></SqueezeBox>
            </div>
        );
    }
}