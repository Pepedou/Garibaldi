import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DropZoneComponent from '../../ui/drop-zone/DropZoneComponent'
import DefaultButton from '../../ui/buttons/DefaultButton'
require('../../../Main.css')
require('./DropZoneOverlay.css')

export default class DropZoneOverlay extends Component {
    toggleOverlay(showDropZoneOverlayRecieved) {
        showDropZoneOverlayRecieved(false)
    }

    onDropAcceptedExtra(imageList, image) {
        this.props.extraImagesReceived(imageList)
    }

    deleteExtraImage(imageList, image) {
        if(imageList.length > 0) {
            if(image === this.props.sourceImage) {
                this.props.sourceImageRecieved("")
            }
        } else {
            this.props.sourceImageRecieved("")
        }
        this.props.extraImagesReceived(imageList)
    }

    onClickProfilePic(image) {
        this.props.sourceImageRecieved(image)
    }

    render() {
        let {showDropZoneOverlay, showDropZoneOverlayRecieved, extraImages, sourceImage} = this.props
        let hasImageList = window.location.pathname === "/artists"
        let soloImage = !hasImageList && sourceImage !== "" && sourceImage ? [sourceImage] : []
        let imageList = hasImageList ? extraImages : soloImage
        let dropzoneColumn = hasImageList ? `col-xs-12 col-md-6` : `col-xs-12 col-md-12`

        return (showDropZoneOverlay 
         ? <div className="Overlay DropZone--overlay">
                <DefaultButton
                    label="Cerrar"
                    floatStyle="right"
                    onTouchTap={() => this.toggleOverlay(showDropZoneOverlayRecieved)}
                />
                <div className="Overlay-content">
                    <div className="row">
                        <div className={dropzoneColumn}>
                            {
                                hasImageList && sourceImage !== ""
                                ? <div className="row">
                                     <div className="photoTitle">Imagen de Perfil</div>
                                     <center>
                                        <img alt="" src={sourceImage} className="profilePic"/>
                                        <div className="profilePicInstruction">De clic sobre la imagen en el apartado de la derecha para cambiar la imagen de perfil</div>
                                     </center>
                                  </div>
                                : null
                            }
                        </div>
                        <div className={dropzoneColumn}>
                            <DropZoneComponent
                                hasImageList={hasImageList} 
                                onDropAcceptedExtra={this.onDropAcceptedExtra.bind(this)}
                                deleteExtraImage={this.deleteExtraImage.bind(this)}
                                onClickProfilePicExtra={this.onClickProfilePic.bind(this)}
                                imageList={imageList}/>
                        </div>
                    </div>
                </div>
            </div>
         : null);
    }
}

DropZoneOverlay.displayName = 'DropZoneOverlay'

DropZoneOverlay.propTypes = {
  showDropZoneOverlay: PropTypes.bool,
  showDropZoneOverlayRecieved: PropTypes.func,
  extraImages: PropTypes.array,
  sourceImage: PropTypes.string,
  sourceImageRecieved: PropTypes.func,
  extraImagesReceived: PropTypes.func
}