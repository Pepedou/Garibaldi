import React, {Component} from 'react';
import Mosaic from '../../components/partials/mosaic/Mosaic';
import './GalleryPage.css';

export default class GalleryPage extends Component {
    render() {
        return (
            <div className="col-xs-12 GalleryPage">
                <div className="row">
                    <Mosaic/>
                </div>
            </div>
        );
    }
}