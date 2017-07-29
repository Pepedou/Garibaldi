import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as constants from '../../redux/constants'
import {connect} from 'react-redux'
import axios from 'axios'
import {NotificationTypes} from '../../components/alerts/notifications/NotificationTypes'
import {handleError} from '../../utils/errorHandling'
import {uploadFile} from '../../utils/services/uploadImagesUtils'
import LoaderComponent from '../../components/ui/loader/LoaderComponent'
import {getForm, FormType} from '../../utils/forms/formUtils'
import {validateObligatoryFields, getFieldValue, getFieldIndex} from '../../utils/fieldValidations'
import InputFieldComponent from '../../components/ui/input-field/InputFieldComponent'
import DefaultButton from '../../components/ui/buttons/DefaultButton'
import Dropzone from 'react-dropzone'
import Category from '../../components/ui/category/Category.js';
import apiRoutes from '../../utils/services/apiRoutes'

require('./NewArtistPage.css')

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

class NewArtistPage extends Component {
    constructor(props)
    {
        super(props)

        this.state = {
            inputFields: getForm(FormType.NEW_ARTIST),
            sourceImage: {},
            sourcePreview: "",
            dataSource: [],
            categories: []
        }
    }

    componentWillMount() {
        let setState = this.setState.bind(this)
        let {addNotification} = this.props
        axios.get(`${apiRoutes.getServiceUrl()}/api/CulturalHelpers`)
        .then(function (response) {
            let culturalHelpers = []
            response.data.map((item, key) => culturalHelpers.push({text: `${item.name} ${item.lastName}`, value: item.id}))
            setState({dataSource: culturalHelpers})
        })
        .catch(function (error) {
            addNotification({type: NotificationTypes.DANGER, contentType: "text", message: error.response.data});
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
        inputFieldsCopy[currentFieldIndex].defaultValue = value.value

        this.setState({inputFields: inputFieldsCopy})
    }

    onDropAccepted(files, {clearAllNotifications, addNotification}) {
        clearAllNotifications()
        this.setState({sourceImage: files[0]})
        this.setState({sourcePreview: files[0].preview})
    }

    onDropRejected(files, {clearAllNotifications, addNotification}) {
        clearAllNotifications()
        addNotification({type: NotificationTypes.DANGER, contentType: "text", message: "La imagen seleccionada no cumple con las características requeridas"})
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

    getArtistFieldsValues(){
        let inputFieldsCopy = [...this.state.inputFields]
        let artist = {}
        inputFieldsCopy.map((item, key) => artist[item.id] = item.defaultValue)
        return artist
    }

    handleOnClick(event, {clearAllNotifications, addNotification, loading}) {
        loading(true)
        event.preventDefault()
        clearAllNotifications();
        let inputFieldsCopy = [...this.state.inputFields]
        let sourceImage = this.state.sourceImage
        let result = validateObligatoryFields(this.state.inputFields)
        if(result.valid){
            let artist = this.getArtistFieldsValues()
            let categories = this.state.categories
            artist.categories = categories

            if(sourceImage !== "") {
                let source = uploadFile(sourceImage, addNotification)
                if(source) {
                    artist.source = source
                }
            } else {
                artist.source = "" //TODO: Poner la ruta de la imagen default
            }

            // axios.post(`${apiRoutes.getServiceUrl()}/api/Artist`, artist, { headers: { 'Content-Type': 'application/json' } })
            // .then(function (response) {
            //     loading(false)
            //     window.location = './artists'
            // })
            // .catch(function (error) {
            //     loading(false)
            //     addNotification({type: NotificationTypes.DANGER, contentType: "text", message: error.response.data});
            // })
        } else {
            loading(false)
            addNotification({type: NotificationTypes.DANGER, contentType: "text", message: "Ingrese la información de los campos marcados en rojo"})
        }
        this.setState({inputFields: result.fieldList})
    }

    render() {
        return (
            <div className="col-xs-12 col-md-12 NewArtPage">
                <div className="row">
                    <div className="col-xs-12 col-md-4 DropZoneSection">
                        <center>
                            <Dropzone 
                                onDropAccepted={(files) => this.onDropAccepted(files, this.props)}
                                onDropRejected={(files) => this.onDropRejected(files, this.props)}
                                accept="image/jpeg, image/png"
                                multiple={false}
                                name="photo"
                                maxSize={15000000}
                                style={style.mainStyle}
                                activeStyle={style.activeStyle}
                                rejectStyle={style.rejectStyle}>
                                <p className="DropZoneSection-message">Intente colocar la imagen aquí, o haga clic para seleccionar la imagen que desea cargar.</p>
                            </Dropzone>
                            <img alt="" src={this.state.sourcePreview} id="preview"/>
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
                                                                    onChange={event => this.handleOnChange(event)}
                                                                    onNewRequest={(value) => this.handleOnNewRequest(value, item.id)}/>)

                                    
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
            </div>
        );
    }
}

NewArtistPage.displayName = 'NewArtistPage'

NewArtistPage.propTypes = {
    addNotification: PropTypes.func,
    clearAllNotifications: PropTypes.func,
    loading: PropTypes.func
}

export const mapDispatchToProps = dispatch => ({
  addNotification: notification => handleError(dispatch, notification),
  clearAllNotifications: () => dispatch({type: constants.CLEAR_ALL_NOTIFICATIONS}),
  loading: showLoader => dispatch({type: constants.SHOW_LOADER, showLoader})
})

export default connect(null, mapDispatchToProps)(NewArtistPage)