require("./ArtistCard.css")

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CardComponent from '../../../ui/card/CardComponent.js'
import CardDescription from './CardDescription'
import CardActions from './CardActions'
import Category from '../../../ui/category/Category'
import {getDetailValue} from '../../../../utils/fieldValidations'
import axios from 'axios'
import apiRoutes from '../../../../utils/services/apiRoutes'
import SvgIcon from 'material-ui/SvgIcon'
import {white} from 'material-ui/styles/colors'
import transformToImages from '../../../../utils/services/cloudinaryImageTransform'
const objectAssign = require('object-assign')

let editBtnStyle = {
    color: white
}

export default class ArtistCard extends Component {
    constructor(props)
    {
        super(props)

        this.state = {
            editedArtist: objectAssign({}, {...props.currentArtist}),
            dataSource: []
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

    handleAddCategory(event) {
        let editedArtistCopy = {...this.state.editedArtist}
        let emptyCategory = {
            label: "Nombre de la categoría...",
            value: "Valor de la categoría..."
        }
        editedArtistCopy.categories.push(emptyCategory)
        this.setState({editedArtist: editedArtistCopy})
    }

    handleCategoryValidation(data, position, property, propertyName) {
        let editedArtistCopy = {...this.state.editedArtist}
        if(propertyName === "category") {
            let currentCategoriesCopy = editedArtistCopy.categories
            if(data === ""){
                currentCategoriesCopy = [...currentCategoriesCopy.slice(0,position), ...currentCategoriesCopy.slice(position+1)]
            } else {
                currentCategoriesCopy[position][property] = data
            }
            editedArtistCopy.categories = currentCategoriesCopy
        } else {
            if(data === "") {
                editedArtistCopy.detail[propertyName].value = this.props.currentArtist.detail[propertyName].value
            } else {
                editedArtistCopy.detail[propertyName].value = data
            }
        }
        this.setState({editedArtist: editedArtistCopy})
    }

    handleOnNewRequest(value){
        let editedArtistCopy = {...this.state.editedArtist}
        editedArtistCopy.detail.culturalHelperName = value.text
        editedArtistCopy.detail.culturalHelperId.value = value.value
        
        this.setState({editedArtist: editedArtistCopy})
    }

    handleOnUpdateInput(data){
        if(!this.state.dataSource.find(item => item.text.toUpperCase() === data.toUpperCase())){
            let editedArtistCopy = {...this.state.editedArtist}
            editedArtistCopy.detail.culturalHelperName = this.props.currentArtist.detail.culturalHelperName
            editedArtistCopy.detail.culturalHelperId.value = this.props.currentArtist.detail.culturalHelperId.value
            
            this.setState({editedArtist: editedArtistCopy})
        }
    }

    getPhoto(editedArtist) {
        if( Object.getOwnPropertyNames(editedArtist).length > 0) {
            if(editedArtist.detail.photo.value === "" || !editedArtist.detail.photo.value) {
                return "https://s3.amazonaws.com/whisperinvest-images/default.png"
            } else {
                return editedArtist.detail.photo.value
            }
        } else {
            return "https://s3.amazonaws.com/whisperinvest-images/default.png"
        }
    }

    handleSave(event) {
        let {currentArtist, loadingArtistDetail, addNotification, sourceImage} = this.props

        let newArtist = {
            name: this.state.editedArtist.detail.name.value,
            lastName: this.state.editedArtist.detail.lastName.value,
            phone: this.state.editedArtist.detail.phone.value,
            photo: sourceImage !== "" ? transformToImages(sourceImage) : this.state.editedArtist.detail.photo.value,
            culturalHelperId: this.state.editedArtist.detail.culturalHelperId.value,
            categories: this.state.editedArtist.categories
        }

        let data = JSON.stringify(newArtist)

        loadingArtistDetail(true)
        axios.patch(`${apiRoutes.getServiceUrl()}/api/Artists/${currentArtist.id}`, data, { headers: { 'Content-Type': 'application/json' } })
        .then(function (response) {
            location.reload()
        })
        .catch(function (error) {
            addNotification(error.response.data.error)
            loadingArtistDetail(false)
        })
    }

    handleDelete() {
        let {currentArtist, loadingArtistDetail, addNotification} = this.props
        let ids = [currentArtist.id]

        loadingArtistDetail(true)
        axios.delete(`${apiRoutes.getServiceUrl()}/api/Artists/eliminate`, ids, { headers: { 'Content-Type': 'application/json' } })
        .then(function (response) {
            location.reload()
        })
        .catch(function (error) {
            addNotification(error.response.data.error)
            loadingArtistDetail(false)
        })
    }

    handlePDF() {
        
    }

    render() {
        let {editedArtist} = this.state
        let {showDropZoneOverlayRecieved, sourceImage} = this.props
        let photo = this.getPhoto(editedArtist)
        return (
            <div className="ArtistCard">
                <div className="imageHeaderBar row">
                    <div className="editImageBtn col-xs-6 col-md-6" onClick={() => showDropZoneOverlayRecieved(true)}>
                        <SvgIcon style={editBtnStyle}>
                            <path d="M2 12.88V16h3.12L14 7.12 10.88 4 2 12.88zm14.76-8.51c.33-.33.33-.85 0-1.18l-1.95-1.95c-.33-.33-.85-.33-1.18 0L12 2.88 15.12 6l1.64-1.63z"/>
                        </SvgIcon>
                    </div>
                </div>
                <CardComponent 
                    overlayTitle={<Category category={{required: true,
                                                       categoryName: 'Nombre',
                                                       categoryValue: editedArtist.detail.name.value,
                                                       editableName: false,
                                                       editableValue: true,
                                                       propertyName: "name"}} 
                                            validate={this.handleCategoryValidation.bind(this)}/>}
                    overlaySubtitle={<Category category={{required: true,
                                                          categoryName: 'Apellido',
                                                          categoryValue: editedArtist.detail.lastName.value,
                                                          editableName: false,
                                                          editableValue: true,
                                                          propertyName: "lastName"}}
                                               validate={this.handleCategoryValidation.bind(this)}/>}
                    cardImage={sourceImage !== "" ? sourceImage : photo}
                    cardTitle={<Category category={{required: true,
                                                    categoryName: 'Email',
                                                    categoryValue: editedArtist.detail.email.value,
                                                    editableName: false,
                                                    editableValue: false,
                                                    propertyName: "email"}}
                                         validate={this.handleCategoryValidation.bind(this)}/>}
                    cardSubtitle={<Category category={{required: false,
                                                       categoryName: 'Teléfono',
                                                       categoryValue: getDetailValue(editedArtist.detail.phone.value),
                                                       editableName: false,
                                                       editableValue: true,
                                                       propertyName: "phone"}}
                                            validate={this.handleCategoryValidation.bind(this)}/>}
                    cardDescription={<CardDescription artistCardInformation={editedArtist}
                                                      onTouchTap={this.handleAddCategory.bind(this)}
                                                      handleCategoryValidation={this.handleCategoryValidation.bind(this)}
                                                      dataSource={this.state.dataSource}
                                                      onNewRequest={this.handleOnNewRequest.bind(this)}
                                                      onUpdateInput={this.handleOnUpdateInput.bind(this)}/>}
                    cardActions={<CardActions handleSave={this.handleSave.bind(this)} handleDelete={this.handleDelete.bind(this)} handlePDF={this.handlePDF.bind(this)}/>}
                />
            </div>
        )
  }
}

ArtistCard.displayName = 'ArtistCard'

ArtistCard.propTypes = {
  currentArtist: PropTypes.object,
  sourceImage: PropTypes.string,
  receiveCurrentArt: PropTypes.func,
  receiveCurrentArtist: PropTypes.func,
  loadingArtistDetail: PropTypes.func,
  addNotification: PropTypes.func,
  showDropZoneOverlayRecieved: PropTypes.func
}