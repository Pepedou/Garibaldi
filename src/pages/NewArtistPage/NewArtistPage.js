import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as constants from '../../redux/constants'
import {connect} from 'react-redux'
import {handleError, ERROR_CODES} from '../../utils/errorHandling'
import LoaderComponent from '../../components/ui/loader/LoaderComponent'
import {getForm, FormType} from '../../utils/forms/formUtils'
import {validateObligatoryFields, getFieldIndex, isEmailFormatValid, updateField, getFieldValue} from '../../utils/fieldValidations'
import InputFieldComponent from '../../components/ui/input-field/InputFieldComponent'
import DefaultButton from '../../components/ui/buttons/DefaultButton'
import DropZoneComponent from '../../components/ui/drop-zone/DropZoneComponent'
import Category from '../../components/ui/category/Category.js';
import CulturalHelpersServices from '../../utils/services/culturalHelperServices'
import ArtistServices from '../../utils/services/artistServices'
import transformToImages from '../../utils/services/cloudinaryImageTransform'
import { withRouter } from 'react-router'

require('./NewArtistPage.css')

class NewArtistPage extends Component {
    constructor(props)
    {
        super(props)

        this.state = {
            inputFields: getForm(FormType.NEW_ARTIST),
            dataSource: [],
            categories: [],
            photo: "",
            profilePics: []
        }
    }

    componentWillMount() {
        let setState = this.setState.bind(this)
        let {addNotification} = this.props

        CulturalHelpersServices.getAll()
        .then(function (response) {
            let culturalHelpers = []
            response.map((item, key) => culturalHelpers.push({text: `${item.name} ${item.lastName}`, value: item.id}))
            setState({dataSource: culturalHelpers})
        })
        .catch(function (error) {
            addNotification(error)
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

    handleOnUpdateInput(data, id){
        if(!this.state.dataSource.find(item => item.text.toUpperCase() === data.toUpperCase())){
            let inputFieldsCopy = [...this.state.inputFields]
            let currentFieldIndex = getFieldIndex(inputFieldsCopy, id)
            inputFieldsCopy[currentFieldIndex].defaultValue = ""
            this.setState({inputFields: inputFieldsCopy})
        }
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

    handleOnClick(event, {clearAllNotifications, addNotification, loading, router}) {
        event.preventDefault()
        clearAllNotifications();
        let inputFieldsCopy = [...this.state.inputFields]
        let {photo, profilePics} = this.state
        let result = validateObligatoryFields(this.state.inputFields)
        if(result.valid){
            let emailValue = getFieldValue(inputFieldsCopy, "email").defaultValue
            if(isEmailFormatValid(emailValue)){
                loading(true)

                let artist = this.getArtistFieldsValues()
                artist.categories = this.state.categories
                artist.photo = photo !== "" ? transformToImages(photo) : {thumbnail: "", standard: ""}
                artist.profilePics = profilePics

                ArtistServices.create(artist)
                .then(function (response) {
                    loading(false)
                    router.push('/artists')
                })
                .catch(function (error) {
                    loading(false)
                    addNotification(error)
                })

            } else {
               inputFieldsCopy = updateField(inputFieldsCopy, "email", "errorText", "El formato del email es incorrecto")
               addNotification({code: ERROR_CODES.CHECK_FIELDS.code})
               this.setState({inputFields: inputFieldsCopy})
            }
            
        } else {
            addNotification({code: ERROR_CODES.REQUIRED_FIELDS.code})
            this.setState({inputFields: result.fieldList})
        }
    }

    onDropAcceptedExtra(imageList, image) {
        if(imageList.length === 1) {
            this.setState({photo: image})
        }
        this.setState({profilePics: imageList})
    }

    deleteExtraImage(imageList, image) {
        if(imageList.length > 0) {
            if(image === this.state.photo) {
                this.setState({photo: imageList[0]})
            }
        } else {
            this.setState({photo: ""})
        }
        this.setState({profilePics: imageList})
    }

    onClickProfilePic(image) {
        this.setState({photo: image})
    }

    render() {
        let {showLoader} = this.props
        return (
            <div className="col-xs-12 col-md-12 NewArtPage">
                {
                    showLoader
                    ? <div className="marginTop row"><center><LoaderComponent/></center></div>
                    : <div className="row">
                        <div className="col-xs-12 col-md-4 DropZoneSection">
                            <div className="row">
                                <DropZoneComponent
                                    hasImageList={true} 
                                    onDropAcceptedExtra={this.onDropAcceptedExtra.bind(this)}
                                    deleteExtraImage={this.deleteExtraImage.bind(this)}
                                    onClickProfilePicExtra={this.onClickProfilePic.bind(this)}/>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-4 NewArtistForm">
                            {
                                this.state.photo !== ""
                                ? <div className="row">
                                     <div className="photoTitle">Imagen de Perfil</div>
                                     <center>
                                        <img alt="" src={this.state.photo} className="profilePic"/>
                                        <div className="profilePicInstruction">De clic sobre la imagen en el apartado de la izquierda para cambiar la imagen de perfil</div>
                                     </center>
                                  </div>
                                : null
                            }
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
                                                                        multiLine={item.multiLine}
                                                                        dataSource={this.state.dataSource}
                                                                        onChange={event => this.handleOnChange(event)}
                                                                        onNewRequest={(value) => this.handleOnNewRequest(value, item.id)}/>)

                                        
                            }
                        </div>
                        <div className="col-xs-12 col-md-4 CategoriesSection">
                            <center>
                                <div className="row">
                                    {
                                        this.state.categories.map((item, key) => <Category 
                                                                                    key={key}
                                                                                    position={key}
                                                                                    category={{required: false, categoryName: item.label, categoryValue: item.value, editableName: true, editableValue: true}}
                                                                                    validate={this.handleCategoryValidation.bind(this)}/>)
                                    }
                                    <DefaultButton
                                        className="artist-creation__add-category"
                                        label="Agregar Categoría"
                                        floatStyle="center"
                                        onTouchTap={event => this.handleAddCategory(event)}
                                        />
                                </div>
                                <div className="row">
                                    <DefaultButton
                                        label="Crear"
                                        floatStyle="center"
                                        className="marginTop artist-creation__save"
                                        onTouchTap={event => this.handleOnClick(event, this.props)}
                                        />
                                </div>
                            </center>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

NewArtistPage.displayName = 'NewArtistPage'

NewArtistPage.propTypes = {
    addNotification: PropTypes.func,
    clearAllNotifications: PropTypes.func,
    loading: PropTypes.func,
    showLoader: PropTypes.bool,
    sourceImageRecieved: PropTypes.func
}

export const mapStateToProps = ({showLoader}) => ({
  showLoader
})

export const mapDispatchToProps = dispatch => ({
  addNotification: notification => handleError(dispatch, notification),
  clearAllNotifications: () => dispatch({type: constants.CLEAR_ALL_NOTIFICATIONS}),
  loading: showLoader => dispatch({type: constants.SHOW_LOADER, showLoader})
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewArtistPage))