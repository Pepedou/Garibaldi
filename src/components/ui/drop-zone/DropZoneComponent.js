import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone'
import {ERROR_CODES} from '../../../utils/errorHandling'
import UploadImageService from '../../../utils/services/uploadImageService'
import LoaderComponent from '../../../components/ui/loader/LoaderComponent'
import * as constants from '../../../redux/constants'
import {connect} from 'react-redux'
import {handleError} from '../../../utils/errorHandling'
require('./DropZone.css')

let style = {
    mainStyle: {
        borderStyle: "dashed",
        borderWidth: 2,
        height: 200
    },
    activeStyle: {
        borderStyle: "dashed",
        borderColor: "green",
        borderWidth: 2,
        height: 200
    },
    rejectStyle: {
        borderStyle: "dashed",
        borderColor: "red",
        borderWidth: 2,
        height: 200
    }
}

class DropZoneComponent extends Component {
    onDropAccepted(files, {clearAllNotifications, addNotification, sourceImageRecieved, loadingDropzone, hasExtraImages, addExtraImage, loadingExtraDropzone}) {
        clearAllNotifications()
        loadingDropzone(true)
        
        UploadImageService.uploadFile(files[0])
        .then(response => {
            if(!hasExtraImages){
                sourceImageRecieved(response.secure_url)
            } else {
                addExtraImage(response.secure_url)
            }
            
            loadingDropzone(false)
        })
        .catch(error => {
            addNotification({code: ERROR_CODES.CANT_SAVE_IMAGE.code})
            loadingDropzone(false)
        })
    }

    onDropRejected(files, {clearAllNotifications, addNotification, setState}) {
        clearAllNotifications()
        addNotification({code: ERROR_CODES.WRONG_IMAGE.code})
    }

    deleteImage(event, sourceImage, {sourceImageRecieved, hasExtraImages, deleteExtraImage}) {
        event.preventDefault();
        if(!hasExtraImages) {
            sourceImageRecieved("")
        } else {
            deleteExtraImage(sourceImage)
        }
    }

    render() {
        let {sourceImage, showDropzoneLoader, hasExtraImages, extraImages} = this.props
        return showDropzoneLoader
            ? <div className="marginTop row"><center><LoaderComponent/></center></div>
            : <div className="DropZoneComponent">
                <Dropzone
                    className="DropzoneSquare"
                    onDropAccepted={(files) => this.onDropAccepted(files, this.props)}
                    onDropRejected={(files) => this.onDropRejected(files, this.props)}
                    accept="image/jpeg, image/png"
                    multiple={false}
                    name="source"
                    maxSize={10000000}
                    style={style.mainStyle}
                    activeStyle={style.activeStyle}
                    rejectStyle={style.rejectStyle}>
                    <div className="DropZoneSection-message">
                        {hasExtraImages && <p>Imágenes de perfil extras</p>}
                        <p>Intente colocar la imagen aquí, o haga clic para seleccionar la imagen que desea cargar.</p>
                        <p>El tamaño máximo aceptado es 10 MB.</p>
                        <p>Esta acción puede tardar algunos segundos.</p>
                    </div>
                </Dropzone>
                {
                    !hasExtraImages && (sourceImage !== "" || sourceImage)
                    ? <center>
                        <div className="PreviewSection">
                            <div className="row">
                                <a className="CloseDropZonebtn" onClick={(event) => this.deleteImage(event, sourceImage, this.props)}>&times;</a>
                            </div>
                            <img alt="" src={sourceImage} id="preview"/>
                        </div>
                      </center>
                    : hasExtraImages && extraImages.length > 0
                    ? <center>
                        <div className="ExtraImagePreviewSection">
                            {extraImages.map((image, key) => <div className="extraImage">
                                <div className="row">
                                    <a className="CloseDropZonebtn" onClick={(event) => this.deleteImage(event, image, this.props)}>&times;</a>
                                </div>
                                <img alt="" src={image} className="extraImagePreview"/>
                            </div>)}
                        </div>
                      </center>
                    : null
                }
            </div>
    }
}

DropZoneComponent.displayName = 'DropZoneComponent'

DropZoneComponent.propTypes = {
    addNotification: PropTypes.func,
    clearAllNotifications: PropTypes.func,
    loadingDropzone: PropTypes.func,
    showDropzoneLoader: PropTypes.bool,
    showExtraDropzoneLoader: PropTypes.bool,
    sourceImage: PropTypes.any,
    extraImages: PropTypes.array,
    sourceImageRecieved: PropTypes.func,
    hasExtraImages: PropTypes.boolean,
    addExtraImage: PropTypes.func,
    deleteExtraImage: PropTypes.func
}

DropZoneComponent.defaultProps = {
    hasExtraImages: false
}

export const mapStateToProps = ({showDropzoneLoader, sourceImage, extraImages, showExtraDropzoneLoader}) => ({
  showDropzoneLoader, sourceImage, extraImages, showExtraDropzoneLoader
})

export const mapDispatchToProps = dispatch => ({
  addNotification: notification => handleError(dispatch, notification),
  clearAllNotifications: () => dispatch({type: constants.CLEAR_ALL_NOTIFICATIONS}),
  loadingDropzone: showDropzoneLoader => dispatch({type: constants.SHOW_DROPZONE_LOADER, showDropzoneLoader}),
  sourceImageRecieved: sourceImage => dispatch({type: constants.SOURCE_IMAGE_RECEIVED, sourceImage}),
  addExtraImage: image => dispatch({type: constants.ADD_EXTRA_IMAGE, image}),
  deleteExtraImage: image => dispatch({type: constants.DELETE_EXTRA_IMAGE, image})
})

export default connect(mapStateToProps, mapDispatchToProps)(DropZoneComponent)