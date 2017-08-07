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

export default class ArtistCard extends Component {
    constructor(props)
    {
        super(props)

        this.state = {
            editedArtist: {...props.currentArtist},
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
        editedArtistCopy.detail.gcname.value = value.text //TODO: Poner el valor correcto
        // editedArtistCopy.detail.culturalHelperId.value = value.value
        
        this.setState({editedArtist: editedArtistCopy})
    }

    handleOnUpdateInput(data){
        if(!this.state.dataSource.find(item => item.text.toUpperCase() === data.toUpperCase())){
            let editedArtistCopy = {...this.state.editedArtist}
            editedArtistCopy.detail.gcname.value = this.props.currentArt.detail.gcname.value  //TODO: Poner el valor correcto
            // editedArtCopy.detail.culturalHelperId.value = this.props.currentArt.detail.culturalHelperId.value
            
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
        let data = {
            name: this.state.editedArtist.detail.name.value,
            lastName: this.state.editedArtist.detail.lastName.value,
            phone: this.state.editedArtist.detail.phone.value,
            photo: this.state.editedArtist.detail.photo.value,
            // culturalHelperId: this.state.editedArtist.detail.culturalHelperId.value,
            categories: this.state.categories
        }

        let {currentArtist, loadingArtistDetail, addNotification} = this.props
        loadingArtistDetail(true)
        // axios.patch(`${apiRoutes.getServiceUrl()}/api/Artists/${currentArtist.detail.id}`, data, { headers: { 'Content-Type': 'application/json' } })
        // .then(function (response) {
        //     //TODO: Ver que hacer una vez que se actualiza
        //     loadingArtistDetail(true)
        // })
        // .catch(function (error) {
        //     addNotification(error.response.data.error)
        //     loadingArtistDetail(true)
        // })
    }

    handleDelete() {
        
    }

    handlePDF() {
        
    }

    render() {
        let {editedArtist} = this.state
        let photo = this.getPhoto(editedArtist)
        return (
            <div className="ArtistCard">
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
                    cardImage={photo}
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
  receiveCurrentArt: PropTypes.func,
  receiveCurrentArtist: PropTypes.func,
  loadingArtistDetail: PropTypes.func,
  addNotification: PropTypes.func,
}