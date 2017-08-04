import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as constants from '../../redux/constants'
import {connect} from 'react-redux'
import axios from 'axios'
import {handleError, ERROR_CODES} from '../../utils/errorHandling'
import LoaderComponent from '../../components/ui/loader/LoaderComponent'
import {getForm, FormType} from '../../utils/forms/formUtils'
import {validateObligatoryFields, getFieldIndex, isEmailFormatValid, updateField, getFieldValue} from '../../utils/fieldValidations'
import InputFieldComponent from '../../components/ui/input-field/InputFieldComponent'
import DefaultButton from '../../components/ui/buttons/DefaultButton'
import DropZoneComponent from '../../components/ui/drop-zone/DropZoneComponent'
import Category from '../../components/ui/category/Category.js';
import apiRoutes from '../../utils/services/apiRoutes'

require('./NewArtistPage.css')

class NewArtistPage extends Component {
    constructor(props)
    {
        super(props)

        this.state = {
            inputFields: getForm(FormType.NEW_ARTIST),
            sourceImage: "",
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

    handleOnClick(event, {clearAllNotifications, addNotification, loading}) {
        event.preventDefault()
        clearAllNotifications();
        let inputFieldsCopy = [...this.state.inputFields]
        let result = validateObligatoryFields(this.state.inputFields)
        if(result.valid){
            let emailValue = getFieldValue(inputFieldsCopy, "email").defaultValue
            if(isEmailFormatValid(emailValue)){
                loading(true)

                let artist = this.getArtistFieldsValues()
                artist.categories = this.state.categories
                artist.photo = this.state.sourceImage

                axios.post(`${apiRoutes.getServiceUrl()}/api/Artists`, artist, { headers: { 'Content-Type': 'application/json' } })
                .then(function (response) {
                    loading(false)
                    window.location = './artists'
                })
                .catch(function (error) {
                    loading(false)
                    addNotification(error.response.data.error)
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
                                <DropZoneComponent {...this.props} setState={this.setState.bind(this)} sourceImage={this.state.sourceImage}/>
                            </center>
                        </div>
                        <div className="col-xs-12 col-md-4 NewArtistForm">
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
    showLoader: PropTypes.bool
}

export const mapStateToProps = ({showLoader}) => ({
  showLoader
})

export const mapDispatchToProps = dispatch => ({
  addNotification: notification => handleError(dispatch, notification),
  clearAllNotifications: () => dispatch({type: constants.CLEAR_ALL_NOTIFICATIONS}),
  loading: showLoader => dispatch({type: constants.SHOW_LOADER, showLoader})
})

export default connect(mapStateToProps, mapDispatchToProps)(NewArtistPage)