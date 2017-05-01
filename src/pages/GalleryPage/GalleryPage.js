import React, {Component} from 'react';
import Mosaic from '../../components/Mosaic/Mosaic';
import SearchBox from '../../components/SearchBox/SearchBox';
import ArtPanel from '../../components/ArtPanel/ArtPanel.js';
import {Overlay, toggleVisibility} from '../../components/Overlay/Overlay.js';
import Modal from '../../components/Modal/Modal.js';
import './GalleryPage.css';


const cardsDummy = [
    {
        artImage: "https://www.cerotec.net/data/fotos/artistico.jpg",
        detail: {
            artName: "Art 1"
        },
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
                categoryValue: "Art 1"
            }
        ]
    },
    {
        artImage: "https://s-media-cache-ak0.pinimg.com/736x/11/12/5a/11125a6354b8328cd1633801240495f0.jpg",
        detail: {
            artName: "Art 2"
        },
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
                categoryValue: "Art 2"
            }
        ]
    },
    {
        artImage: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/ebb-and-flow-mandy-budan.jpg",
        detail: {
            artName: "Art 3"
        },
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
                categoryValue: "Art 3"
            }
        ]
    },
    {
        artImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQrck_u2rZRCU2-nHoBzB_GcJeBRjEFqt2Xbztv5xLAHtqyDuL",
        detail: {
            artName: "Art 4"
        },
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
                categoryValue: "Art 4"
            }
        ]
    }
]

export default class GalleryPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOverlayActive: false,
            artPanelContent: cardsDummy[0],
            cards: cardsDummy
        };
    }

    handleClickArtCardGrid(content) {
        this.setState({
            artPanelContent: content
        });

        if(screen.width < 1024){
            this.setState({
                isOverlayActive: true
            });
        } else {
            this.setState({
                isOverlayActive: false
            });
        }
    }

    render() {
        let modalHeader = <div>Agregar obra</div>;

        let artPanelOverlay = this.state.isOverlayActive ? 
        <Overlay showButton={false}>
            <ArtPanel art={this.state.artPanelContent}/>
        </Overlay> : null;

        let newArtOverlayWithButton = <div className="NewArtOverlayWithButton">
            <button type="button" onClick={toggleVisibility} className="addArtButton">Agregar obra</button>
            <Overlay showButton={true}>
                <Modal header={modalHeader}>
                    formulario de nueva obra           
                </Modal>
            </Overlay>
        </div>

        return (
            <div className="main-area container-fluid GalleryPage">
                <div className="row">
                    <SearchBox/>
                    {newArtOverlayWithButton}
                </div>
                <div className="row">
                    <div className="col-xs-12 col-md-8">
                        <div className="row">
                            <Mosaic cards={this.state.cards} handleClickArtCardGrid={this.handleClickArtCardGrid.bind(this)}/>
                        </div>
                    </div>
                    <div className="col-md-4 ArtPanelColumn">
                        <div className="row">
                            <ArtPanel art={this.state.artPanelContent}/>
                        </div>
                    </div>
                    {artPanelOverlay}
                </div>
            </div>
        );
    }
}