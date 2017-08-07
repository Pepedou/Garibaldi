import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CardComponent from '../../../ui/card/CardComponent.js'
import CardDescription from './CardDescription'
import CardActions from './CardActions'
import Category from '../../../ui/category/Category'
import {getDetailValue} from '../../../../utils/fieldValidations'
import apiRoutes from '../../../../utils/services/apiRoutes'
import axios from 'axios'
require('./ArtCard.css')

export default class ArtCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOverlayVisible: false,
            editedArt: {...props.currentArt},
            dataSource: []
        };
    }

    componentWillMount() {
        let setState = this.setState.bind(this)
        let {addNotification, currentUser} = this.props
        axios.get(`${apiRoutes.getServiceUrl()}/api/Artists`)
        .then(function (response) {
            let artists = []
            response.data.map((item, key) => artists.push({text: `${item.name} ${item.lastName}`, value: item.id}))
            setState({dataSource: artists})
        })
        .catch(function (error) {
            addNotification(error.response.data.error)
        })
    }

    handleAddCategory(event) {
        let editedArtCopy = {...this.state.editedArt}
        let emptyCategory = {
            label: "Nombre de la categoría...",
            value: "Valor de la categoría..."
        }
        editedArtCopy.categories.push(emptyCategory)
        this.setState({editedArt: editedArtCopy})
    }

    handleCategoryValidation(data, position, property, propertyName) {
        let editedArtCopy = {...this.state.editedArt}
        if(propertyName === "category") {
            let currentCategoriesCopy = editedArtCopy.categories
            if(data === ""){
            currentCategoriesCopy = [...currentCategoriesCopy.slice(0,position), ...currentCategoriesCopy.slice(position+1)]
            } else {
            currentCategoriesCopy[position][property] = data
            }
            editedArtCopy.categories = currentCategoriesCopy
        } else {
            if(data === "") {
                editedArtCopy.detail[propertyName].value = this.props.currentArt.detail[propertyName].value
            } else {
                editedArtCopy.detail[propertyName].value = data
            }
        }
        this.setState({editedArt: editedArtCopy})
    }

    handleOnNewRequest(value){
        let editedArtCopy = {...this.state.editedArt}
        editedArtCopy.detail.author.value = value.text
        // editedArtCopy.detail.artistId.value = value.value
        
        this.setState({editedArt: editedArtCopy})
    }

    handleOnUpdateInput(data){
        if(!this.state.dataSource.find(item => item.text.toUpperCase() === data.toUpperCase())){
            let editedArtCopy = {...this.state.editedArt}
            editedArtCopy.detail.author.value = this.props.currentArt.detail.author.value
            // editedArtCopy.detail.artistId.value = 0
            
            this.setState({editedArt: editedArtCopy})
        }
    }

    handleSave(event) {
        let data = {
            author: this.state.editedArt.detail.author.value,
            title: this.state.editedArt.detail.title.value,
            year: this.state.editedArt.detail.year.value,
            description: this.state.editedArt.detail.description.value,
            technique: this.state.editedArt.detail.technique.value,
            materials: this.state.editedArt.detail.materials.value,
            measurements: this.state.editedArt.detail.measurements.value,
            // artistId: this.state.editedArt.detail.artistId.value,
            images: this.state.editedArt.detail.images.value,
            // culturalHelperId: this.state.editedArt.detail.culturalHelperId.value,
            categories: this.state.editedArt.categories
        }

        let {currentArtist, loadingArtDetail, addNotification} = this.props
        loadingArtDetail(true)
        // axios.patch(`${apiRoutes.getServiceUrl()}/api/ArtPieces/${currentArt.detail.id}`, data, { headers: { 'Content-Type': 'application/json' } })
        // .then(function (response) {
        //     //TODO: Ver que hacer una vez que se actualiza
        //     loadingArtDetail(true)
        // })
        // .catch(function (error) {
        //     addNotification(error.response.data.error)
        //     loadingArtDetail(true)
        // })
    }

    handleDelete() {
        
    }

    handlePDF() {
        
    }

    render() {
        let {showFullImageOverlayRecieved} = this.props
        let {editedArt} = this.state
        return (
            <div className="ArtCard">
                <div className="FullImage-button" onClick={() => showFullImageOverlayRecieved(true)}>Imagen completa</div>
                <CardComponent 
                    overlayTitle={<Category category={{required: true,
                                                       categoryName: 'Obra',
                                                       categoryValue: editedArt.detail.title.value,
                                                       editableName: false,
                                                       editableValue: true,
                                                       propertyName: "title"}}
                                            validate={this.handleCategoryValidation.bind(this)}/>}
                    overlaySubtitle={<Category category={{required: false,
                                                          categoryName: 'Año',
                                                          categoryValue: getDetailValue(editedArt.detail.year.value.toString()),
                                                          editableName: false,
                                                          editableValue: true,
                                                          propertyName: "year"}}
                                               validate={this.handleCategoryValidation.bind(this)}/>}
                    cardImage={editedArt.detail.images.value.standard}
                    cardTitle={<Category category={{required: true,
                                                    categoryName: 'Artista',
                                                    categoryValue: editedArt.detail.author.value,
                                                    editableName: false,
                                                    editableValue: true,
                                                    propertyName: "author"}}
                                         validate={this.handleCategoryValidation.bind(this)}
                                         isAutocomplete={true}
                                         dataSource={this.state.dataSource}
                                         onNewRequest={this.handleOnNewRequest.bind(this)}
                                         onUpdateInput={this.handleOnUpdateInput.bind(this)}/>}
                    cardSubtitle={<Category category={{required: false,
                                                       categoryName: 'Descripción',
                                                       categoryValue: getDetailValue(editedArt.detail.description.value),
                                                       editableName: false,
                                                       editableValue: true,
                                                       editingClass:"TextAreaStyle",
                                                       propertyName: "description"}}
                                            validate={this.handleCategoryValidation.bind(this)}
                                            editingElement="textarea"/>}
                    cardDescription={<CardDescription artCardInformation={editedArt}
                                                      onTouchTap={this.handleAddCategory.bind(this)}
                                                      handleCategoryValidation={this.handleCategoryValidation.bind(this)}/>}
                    cardActions={<CardActions handleSave={this.handleSave.bind(this)} handleDelete={this.handleDelete.bind(this)} handlePDF={this.handlePDF.bind(this)}/>}
                />
            </div>
        )
  }
}

ArtCard.displayName = 'ArtCard'

ArtCard.propTypes = {
  currentArt: PropTypes.object,
  receiveCurrentArt: PropTypes.func,
  showFullImageOverlayRecieved: PropTypes.func,
  loadingArtDetail: PropTypes.func,
  addNotification: PropTypes.func,
}