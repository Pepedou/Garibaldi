import React, {Component} from 'react';
import Mosaic from '../../components/mosaic/mosaic';

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