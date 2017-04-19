import React, {Component} from 'react';
import Mosaic from '../../components/Mosaic/Mosaic';
import SearchBox from '../../components/SearchBox/SearchBox';
import ArtPanel from '../../components/ArtPanel/ArtPanel.js';

let art = {
    artImage: "https://www.cerotec.net/data/fotos/artistico.jpg",
    categories: [
        {
            required: true,
            editableName: true,
            editableValue: true,
            categoryName: "Autor",
            categoryValue: "Lucía Echenique Álvarez"
        },
        {
            required: true,
            editableName: true,
            editableValue: true,
            categoryName: "Nombre de la pieza",
            categoryValue: "Cualquier nombre"
        }
    ]
}

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
                            <ArtPanel art={art}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}