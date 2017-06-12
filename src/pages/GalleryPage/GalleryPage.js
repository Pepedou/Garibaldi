import React, {Component} from 'react';
import Mosaic from '../../components/partials/mosaic/Mosaic';
import ArtCard from '../../components/partials/art-card/ArtCard';
import './GalleryPage.css';

export default class GalleryPage extends Component {
    render() {
        return (
            <div className="col-xs-12 col-md-12 GalleryPage">
                <div className="row">
                    <div className="col-xs-12 col-md-8">
                        <div className="row">
                            <Mosaic/>
                        </div>
                    </div>
                    <div className="ArtPanelColumn col-xs-12 col-md-4">
                        <div className="row">
                            <div className="col-xs-12 col-md-12">
                                <ArtCard />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}