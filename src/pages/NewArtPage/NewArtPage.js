import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as constants from '../../redux/constants'
import {connect} from 'react-redux'
import axios from 'axios'
import {handleError, ERROR_CODES} from '../../utils/errorHandling'
import LoaderComponent from '../../components/ui/loader/LoaderComponent'
import {getForm, FormType} from '../../utils/forms/formUtils'
import {validateObligatoryFields, getFieldIndex} from '../../utils/fieldValidations'
import InputFieldComponent from '../../components/ui/input-field/InputFieldComponent'
import DefaultButton from '../../components/ui/buttons/DefaultButton'
import Dropzone from 'react-dropzone'
import Category from '../../components/ui/category/Category.js'
import apiRoutes from '../../utils/services/apiRoutes'
import sha1 from 'sha1'
import superagent from 'superagent'
import transformToImages from '../../utils/services/cloudinaryImageTransform'
import {UserTypes} from '../../utils/constants/UserTypes'

require('./NewArtPage.css')

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

class NewArtPage extends Component {
    constructor(props)
    {
        super(props)

        this.state = {
            inputFields: getForm(FormType.NEW_ART),
            sourceImage: {},
            sourcePreview: "",
            dataSource: [],
            categories: [],
            artistId: ""
        }
    }

    componentWillMount() {
        let setState = this.setState.bind(this)
        let {addNotification, currentUser} = this.props
        let inputFieldsCopy = [...this.state.inputFields]
        axios.get(`${apiRoutes.getServiceUrl()}/api/Artists`)
        .then(function (response) {
            let artists = []
            response.data.map((item, key) => artists.push({text: `${item.name} ${item.lastName}`, value: item.id}))
            setState({dataSource: artists})

            if(currentUser.ownerType === UserTypes.ARTISTA) {
                let currentFieldIndex = getFieldIndex(inputFieldsCopy, "author")
                let newInputList = [...inputFieldsCopy.slice(0,currentFieldIndex), ...inputFieldsCopy.slice(currentFieldIndex+1)]
                setState({inputFields: newInputList})
            }

            
        })
        .catch(function (error) {
            addNotification(error.response.data.error)
        })
    }

    handleOnChange(event, index, value){
        let inputFieldsCopy = [...this.state.inputFields]
        let currentFieldIndex = getFieldIndex(inputFieldsCopy, event.target.id)
        inputFieldsCopy[currentFieldIndex].defaultValue = event.target.value

        this.setState({inputFields: inputFieldsCopy})
    }

    handleOnNewRequest(value, id){
        let inputFieldsCopy = [...this.state.inputFields]
        let currentFieldIndex = getFieldIndex(inputFieldsCopy, id)
        inputFieldsCopy[currentFieldIndex].defaultValue = value.text

        this.setState({artistId: value.value})
        this.setState({inputFields: inputFieldsCopy})
    }

    handleOnUpdateInput(data, id){
        if(!this.state.dataSource.find(item => item.text.toUpperCase() === data.toUpperCase())){
            let inputFieldsCopy = [...this.state.inputFields]
            let currentFieldIndex = getFieldIndex(inputFieldsCopy, id)
            inputFieldsCopy[currentFieldIndex].defaultValue = ""
            this.setState({inputFields: inputFieldsCopy})
        }
    }

    onDropAccepted(files, {clearAllNotifications, addNotification}) {
        clearAllNotifications()
        this.setState({sourceImage: files[0]})
        this.setState({sourcePreview: files[0].preview})
    }

    onDropRejected(files, {clearAllNotifications, addNotification}) {
        clearAllNotifications()
        addNotification({code: ERROR_CODES.WRONG_IMAGE.code})
    }

    handleAddCategory(event) {
        let currentCategoriesCopy = [...this.state.categories]
        let emptyCategory = {
            label: "Nombre de la categoría...",
            value: "Valor de la categoría..."
        }
        currentCategoriesCopy.push(emptyCategory)
        this.setState({categories: currentCategoriesCopy})
    }

    handleCategoryValidation(data, position, property) {
        let currentCategoriesCopy = [...this.state.categories]
        if(data === ""){
           currentCategoriesCopy = [...currentCategoriesCopy.slice(0,position), ...currentCategoriesCopy.slice(position+1)]
        } else {
           currentCategoriesCopy[position][property] = data
        }
        this.setState({categories: currentCategoriesCopy})
    }

    getArtFieldsValues(){
        let inputFieldsCopy = [...this.state.inputFields]
        let art = {}
        inputFieldsCopy.map((item, key) => art[item.id] = item.defaultValue)
        return art
    }

    uploadFile(file, addNotification, loading, currentUser) {
        const cloudName = 'zamancer'; // FROM CLOUDINARY SETTINGS
        const apiKey = '874385962738742'; // FROM CLOUDINARY SETTINGS
        const apiSecret = 'QLGmPgxfLxR72oBwfveKk4cn00M'; // FROM CLOUDINARY SETTINGS
        const timeStamp = Date.now() / 1000;
        const uploadPreset = 'mywnuuzi'; // FROM CLOUDINARY SETTINGS

        const paramStr = 'timestamp=' + timeStamp + '&upload_preset=' + uploadPreset + apiSecret;
        const url = 'https://api.cloudinary.com/v1_1/' + cloudName + '/image/upload';

        const signature = sha1(paramStr);
        const params = {
            'api_key': apiKey,
            'timestamp': timeStamp,
            'upload_preset': uploadPreset,
            'signature': signature
        }

        const image = file
        let uploadRequest = superagent.post(url);
        uploadRequest.attach('file', image);

        Object.keys(params).forEach((key) => {
            uploadRequest.field(key, params[key]);
        });

        uploadRequest.end((err, res) => {
            if(err) {
                addNotification({code: ERROR_CODES.CANT_SAVE_IMAGE.code})
                return;
            }

            const uploaded = res.body;
            let art = this.getArtFieldsValues()
            art.images = transformToImages(uploaded.secure_url);
            art.artistId = this.state.artistId
            art.source = uploaded.secure_url
            art.categories = this.state.categories

            if(currentUser.ownerType === UserTypes.ARTISTA) {
                art.artistId = currentUser.ownerId
                art.author = `${currentUser.name} ${currentUser.lastName}`
            }

            axios.post(`${apiRoutes.getServiceUrl()}/api/ArtPieces`, art, { headers: { 'Content-Type': 'application/json' } })
            .then(function (response) {
                loading(false)
                window.location = './home'
            })
            .catch(function (error) {
                loading(false)
                addNotification(error.response.data.error)
            })
        })
    }

    handleOnClick(event, {clearAllNotifications, addNotification, loading, currentUser}) {
        loading(true)
        event.preventDefault()
        clearAllNotifications();
        let sourceImage = this.state.sourceImage
        let result = validateObligatoryFields(this.state.inputFields)
        if(result.valid && sourceImage !== ""){
            this.uploadFile(sourceImage, addNotification, loading, currentUser)
        } else {
            loading(false)
            addNotification({code: ERROR_CODES.REQUIRED_FIELDS_NEW_ART.code})
        }
        this.setState({inputFields: result.fieldList})
    }

    deleteImage() {
        this.setState({sourcePreview: ""})
    }

    render() {
        return (
            <div className="col-xs-12 col-md-12 NewArtPage">
                    {
                        this.props.showLoader
                        ? <div className="marginTop row"><center><LoaderComponent/></center></div>
                        : <div className="row">
                            <div className="col-xs-12 col-md-4 DropZoneSection">
                                <center>
                                    <Dropzone 
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
                                        this.state.sourcePreview !== "" || this.state.sourcePrevie
                                        ? <div className="PreviewSection">
                                            <a className="Closebtn" onClick={this.deleteImage.bind(this)}>&times;</a>
                                            <img alt="" src={this.state.sourcePreview} id="preview"/>
                                        </div>
                                        : null
                                    }
                                </center>
                            </div>
                            <div className="col-xs-12 col-md-4 NewArtForm">
                                {
                                    this.state.inputFields.map((item, key) => <InputFieldComponent key={key}
                                                                            inputType={item.inputType} 
                                                                            hintText={item.hintText}
                                                                            floatingLabelText={item.floatingLabelText}
                                                                            className={item.className}
                                                                            id={item.id}
                                                                            type={item.type}
                                                                            errorText={item.errorText}
                                                                            options={item.options}
                                                                            defaultValue={item.defaultValue}
                                                                            dataSource={this.state.dataSource}
                                                                            multiLine={item.multiLine}
                                                                            onChange={event => this.handleOnChange(event)}
                                                                            onNewRequest={value => this.handleOnNewRequest(value, item.id)}
                                                                            onUpdateInput={value => this.handleOnUpdateInput(value, item.id)}/>)

                                            
                                }
                            </div>
                            <div className="col-xs-12 col-md-4 CategoriesSection">
                                {
                                    this.state.categories.map((item, key) => <Category 
                                                                                key={key}
                                                                                position={key}
                                                                                category={{required: false, categoryName: item.label, categoryValue: item.value, editableName: true, editableValue: true}}
                                                                                validate={this.handleCategoryValidation.bind(this)}/>)
                                }
                                <center>
                                    <DefaultButton
                                        label="Agregar Categoría"
                                        floatStyle="center"
                                        onTouchTap={event => this.handleAddCategory(event)}
                                        />
                                </center>
                                <center>
                                    <DefaultButton
                                        label="Crear"
                                        floatStyle="center"
                                        className="marginTop"
                                        onTouchTap={event => this.handleOnClick(event, this.props)}
                                        />
                                </center>
                            </div>
                        </div>
                    }
            </div>
        );
    }
}

NewArtPage.displayName = 'NewArtPage'

NewArtPage.propTypes = {
    addNotification: PropTypes.func,
    clearAllNotifications: PropTypes.func,
    loading: PropTypes.func,
    showLoader: PropTypes.bool,
    currentUser: PropTypes.object
}

export const mapStateToProps = ({showLoader, currentUser}) => ({
  showLoader, currentUser
})

export const mapDispatchToProps = dispatch => ({
  addNotification: notification => handleError(dispatch, notification),
  clearAllNotifications: () => dispatch({type: constants.CLEAR_ALL_NOTIFICATIONS}),
  loading: showLoader => dispatch({type: constants.SHOW_LOADER, showLoader})
})

export default connect(mapStateToProps, mapDispatchToProps)(NewArtPage)