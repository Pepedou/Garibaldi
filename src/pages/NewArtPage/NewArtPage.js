import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as constants from '../../redux/constants'
import {connect} from 'react-redux'
import {handleError, ERROR_CODES} from '../../utils/errorHandling'
import LoaderComponent from '../../components/ui/loader/LoaderComponent'
import {getForm, FormType} from '../../utils/forms/formUtils'
import {validateObligatoryFields, getFieldIndex} from '../../utils/fieldValidations'
import InputFieldComponent from '../../components/ui/input-field/InputFieldComponent'
import DefaultButton from '../../components/ui/buttons/DefaultButton'
import DropZoneComponent from '../../components/ui/drop-zone/DropZoneComponent'
import Category from '../../components/ui/category/Category.js'
import transformToImages from '../../utils/services/cloudinaryImageTransform'
import {UserTypes} from '../../utils/constants/UserTypes'
import ArtistServices from '../../utils/services/artistServices'
import ArtPieceServices from '../../utils/services/artPiecesServices'

require('./NewArtPage.css')

class NewArtPage extends Component {
    constructor(props)
    {
        super(props)

        this.state = {
            inputFields: getForm(FormType.NEW_ART),
            dataSource: [],
            categories: [],
            artistId: ""
        }
    }

    componentWillMount() {
        let setState = this.setState.bind(this)
        let {addNotification, currentUser} = this.props
        let inputFieldsCopy = [...this.state.inputFields]

        ArtistServices.getAll()
        .then(function (response) {
            let artists = []
            response.map((item, key) => artists.push({text: `${item.name} ${item.lastName}`, value: item.id}))
            setState({dataSource: artists})

            if(currentUser.ownerType === UserTypes.ARTISTA) {
                let currentFieldIndex = getFieldIndex(inputFieldsCopy, "author")
                let newInputList = [...inputFieldsCopy.slice(0,currentFieldIndex), ...inputFieldsCopy.slice(currentFieldIndex+1)]
                setState({inputFields: newInputList})
            }
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

    handleOnClick(event, {clearAllNotifications, addNotification, loading, currentUser, sourceImage}) {
        loading(true)
        event.preventDefault()
        clearAllNotifications();
        let result = validateObligatoryFields(this.state.inputFields)
        if(result.valid && sourceImage !== ""){
            let art = this.getArtFieldsValues()
            art.images = transformToImages(sourceImage);
            art.artistId = this.state.artistId
            art.source = sourceImage
            art.categories = this.state.categories

            if(currentUser.ownerType === UserTypes.ARTISTA) {
                art.artistId = currentUser.ownerId
                art.author = `${currentUser.name} ${currentUser.lastName}`
            }

            ArtPieceServices.create(art)
            .then(function (response) {
                loading(false)
                window.location = './home'
            })
            .catch(function (error) {
                loading(false)
                addNotification(error)
            })
        } else {
            loading(false)
            addNotification({code: ERROR_CODES.REQUIRED_FIELDS_NEW_ART.code})
        }
        this.setState({inputFields: result.fieldList})
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
                                <center>
                                    <DropZoneComponent/>
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
    currentUser: PropTypes.object,
    loadingDropzone: PropTypes.func,
    sourceImageRecieved: PropTypes.func,
    sourceImage: PropTypes.string
}

export const mapStateToProps = ({showLoader, currentUser, sourceImage}) => ({
  showLoader, currentUser, sourceImage
})

export const mapDispatchToProps = dispatch => ({
  addNotification: notification => handleError(dispatch, notification),
  clearAllNotifications: () => dispatch({type: constants.CLEAR_ALL_NOTIFICATIONS}),
  loading: showLoader => dispatch({type: constants.SHOW_LOADER, showLoader}),
  sourceImageRecieved: sourceImage => dispatch({type: constants.SOURCE_IMAGE_RECEIVED, sourceImage})
})

export default connect(mapStateToProps, mapDispatchToProps)(NewArtPage)