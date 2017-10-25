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
    onDropAccepted(files, {clearAllNotifications, addNotification, sourceImageRecieved, loadingDropzone, onDropAcceptedExtra, className}) {
        clearAllNotifications()
        loadingDropzone(true)
        UploadImageService.uploadFile(files[0])
        .then(response => {
            sourceImageRecieved(response.secure_url)
            if(onDropAcceptedExtra) {
                onDropAcceptedExtra(response.secure_url, className)
            }
            loadingDropzone(false)
        })
        .catch(error => {
            addNotification({code: ERROR_CODES.CANT_SAVE_IMAGE.code})
            loadingDropzone(false)
        })
    }

    onDropRejected(files, {clearAllNotifications, addNotification, setState, onDropRejectedExtra, className}) {
        clearAllNotifications()
        onDropRejectedExtra(className)
        addNotification({code: ERROR_CODES.WRONG_IMAGE.code})
    }

    deleteImage(event, {sourceImageRecieved}) {
        event.preventDefault();
        sourceImageRecieved("")
    }

    render() {
        let {sourceImage, showDropzoneLoader, className} = this.props
        let dropClass = `DropzoneSquare ${className}`
        return showDropzoneLoader
            ? <div className="marginTop row"><center><LoaderComponent/></center></div>
            : <div className="DropZoneComponent">
                <Dropzone
                    className={dropClass}
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
                        <p>Intente colocar la imagen aquí, o haga clic para seleccionar la imagen que desea cargar.</p>
                        <p>El tamaño máximo aceptado es 10 MB.</p>
                        <p>Esta acción puede tardar algunos segundos.</p>
                    </div>
                </Dropzone>
                {
                    sourceImage !== "" || sourceImage
                    ? <center>
                        <div className="PreviewSection">
                            <div className="row">
                                <a className="CloseDropZonebtn" onClick={(event) => this.deleteImage(event, this.props)}>&times;</a>
                            </div>
                            <img alt="" src={sourceImage} id="preview"/>
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
    sourceImage: PropTypes.any,
    sourceImageRecieved: PropTypes.func,
    className: PropTypes.string,
    onDropAcceptedExtra: PropTypes.func,
    onDropRejectedExtra: PropTypes.func
}

export const mapStateToProps = ({showDropzoneLoader, sourceImage}) => ({
  showDropzoneLoader, sourceImage
})

export const mapDispatchToProps = dispatch => ({
  addNotification: notification => handleError(dispatch, notification),
  clearAllNotifications: () => dispatch({type: constants.CLEAR_ALL_NOTIFICATIONS}),
  loadingDropzone: showDropzoneLoader => dispatch({type: constants.SHOW_DROPZONE_LOADER, showDropzoneLoader}),
  sourceImageRecieved: sourceImage => dispatch({type: constants.SOURCE_IMAGE_RECEIVED, sourceImage})
})

export default connect(mapStateToProps, mapDispatchToProps)(DropZoneComponent)