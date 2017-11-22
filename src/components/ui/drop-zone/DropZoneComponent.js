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
    constructor(props)
    {
        super(props)

        this.state = {
            loading: false,
            imageList: props.imageList
        }
    }

    onDropAccepted(files, {clearAllNotifications, addNotification, hasImageList, onDropAcceptedExtra}) {
        clearAllNotifications()
        this.setState({loading: true})
        let imageListCopy = [...this.state.imageList]
        let setStateFunc = this.setState.bind(this)
        
        UploadImageService.uploadFile(files[0])
        .then(response => {
            if(!hasImageList){
                imageListCopy[0] = response.secure_url
            } else {
                imageListCopy.push(response.secure_url)
            }
            setStateFunc({imageList: imageListCopy})

            if(onDropAcceptedExtra){
                onDropAcceptedExtra(imageListCopy, response.secure_url)
            }
            setStateFunc({loading: false})
        })
        .catch(error => {
            addNotification({code: ERROR_CODES.CANT_SAVE_IMAGE.code})
            setStateFunc({loading: false})
        })
    }

    onDropRejected(files, {clearAllNotifications, addNotification, setState}) {
        clearAllNotifications()
        addNotification({code: ERROR_CODES.WRONG_IMAGE.code})
    }

    deleteImage(event, image, {deleteExtraImage}) {
        event.preventDefault();
        //Delete image in cloudinary

        let imageListCopy = [...this.state.imageList]
        let index = imageListCopy.indexOf(image)
        imageListCopy = [...imageListCopy.slice(0,index), ...imageListCopy.slice(index+1)]
        this.setState({imageList: imageListCopy})

        if(deleteExtraImage) {
            deleteExtraImage(imageListCopy, image)
        } 
    }

    onClickProfilePic(event, image, {hasImageList, onClickProfilePicExtra}) {
        if(hasImageList){
            if(onClickProfilePicExtra) {
                onClickProfilePicExtra(image)
            }
        }
    }

    render() {
        let {hasImageList} = this.props
        let previewImageClass = hasImageList ? "listImage" : "soloImage"
        let imageClass = hasImageList ? "imagePreview" : "preview"
        return this.state.loading
            ? <div className="marginTop row"><center><LoaderComponent/></center></div>
            : <div className="DropZoneComponent">
                <div className="linkWrapper">¿Problemas al subir tu imagen? Intenta con <a href="https://www.befunky.com/" target="_blank" rel="noopener noreferrer" className="dropzoneLink">esta</a> herramienta.</div>
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
                        {hasImageList && <p>Imágenes de perfil</p>}
                        <p>Intente colocar la imagen aquí, o haga clic para seleccionar la imagen que desea cargar.</p>
                        <p>El tamaño máximo aceptado es 10 MB.</p>
                        <p>Esta acción puede tardar algunos segundos.</p>
                    </div>
                </Dropzone>
                {
                    this.state.imageList.length > 0
                    ? <center>
                        <div className="PreviewSection">
                            {this.state.imageList.map((image, key) => <div className={previewImageClass} key={key}>
                                <div className="row">
                                    <a className="CloseDropZonebtn" onClick={(event) => this.deleteImage(event, image, this.props)}>&times;</a>
                                </div>
                                <img alt="" src={image} className={imageClass} onClick={(event) => this.onClickProfilePic(event, image, this.props)}/>
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
    hasImageList: PropTypes.bool,
    deleteExtraImage: PropTypes.func,
    onDropAcceptedExtra: PropTypes.func,
    onClickProfilePicExtra: PropTypes.func,
    imageList: PropTypes.array
}

DropZoneComponent.defaultProps = {
    hasImageList: false,
    imageList: []
}

export const mapDispatchToProps = dispatch => ({
  addNotification: notification => handleError(dispatch, notification),
  clearAllNotifications: () => dispatch({type: constants.CLEAR_ALL_NOTIFICATIONS})
})

export default connect(null, mapDispatchToProps)(DropZoneComponent)