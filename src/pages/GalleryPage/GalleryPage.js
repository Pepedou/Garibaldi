import React, {Component} from 'react';
import Mosaic from '../../components/Mosaic/Mosaic';
import SearchBox from '../../components/SearchBox/SearchBox';
import ArtPanel from '../../components/ArtPanel/ArtPanel.js';

export default class GalleryPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPanelActive: false
        };
    }

    render() {
        return (
            <div className="main-area container-fluid GalleryPage">
                <div className="row">
                    <SearchBox/>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-md-8">
                        <div className="row">
                            <Mosaic/>
                        </div>
                    </div>
                    <div className="col-xs-0 col-md-4">
                        <div className="row">
                            <ArtPanel/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}