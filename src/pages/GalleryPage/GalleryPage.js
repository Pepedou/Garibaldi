import React, {Component} from 'react';
import Mosaic from '../../components/Mosaic/mosaic';

export default class GalleryPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPanelActive: false
        };
    }

    render() {
        return (
            <div className="main-area">
                <Mosaic/>
            </div>
        );
    }
}