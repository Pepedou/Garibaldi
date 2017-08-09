import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone'
import {ERROR_CODES} from '../../../utils/errorHandling'
import {uploadFile} from '../../../utils/services/uploadImage'
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
    onDropAccepted(files, {clearAllNotifications, addNotification, sourceImageRecieved, loadingDropzone}) {
        clearAllNotifications()
        loadingDropzone(true)
        uploadFile(files[0], addNotification, sourceImageRecieved, loadingDropzone)
    }

    onDropRejected(files, {clearAllNotifications, addNotification, setState}) {
        clearAllNotifications()
        addNotification({code: ERROR_CODES.WRONG_IMAGE.code})
    }

    deleteImage(event, {sourceImageRecieved}) {
        event.preventDefault();
        sourceImageRecieved("")
    }

    render() {
        let {sourceImage, showDropzoneLoader} = this.props
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
                    maxSize={15000000}
                    style={style.mainStyle}
                    activeStyle={style.activeStyle}
                    rejectStyle={style.rejectStyle}>
                    <p className="DropZoneSection-message">Intente colocar la imagen aquí, o haga clic para seleccionar la imagen que desea cargar.</p>
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
    sourceImageRecieved: PropTypes.func
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