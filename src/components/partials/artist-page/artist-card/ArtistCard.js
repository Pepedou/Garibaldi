require("./ArtistCard.css")

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CardComponent from '../../../ui/card/CardComponent.js'
import CardDescription from './CardDescription'
import CardActions from './CardActions'
import Category from '../../../ui/category/Category'
import {getDetailValue} from '../../../../utils/fieldValidations'

export default class ArtistCard extends Component {
    handleAddCategory(event) {
        let {receiveCurrentArtist} = this.props
        let currentArtistCopy = {...this.props.currentArtist}
        let emptyCategory = {
            label: "Nombre de la categoría...",
            value: "Valor de la categoría..."
        }
        currentArtistCopy.categories.push(emptyCategory)
        receiveCurrentArtist(currentArtistCopy)
    }

    handleCategoryValidation(data, position, property) {
        let {receiveCurrentArtist} = this.props
        let currentArtistCopy = {...this.props.currentArtist}
        let currentCategoriesCopy = currentArtistCopy.categories
        if(data === ""){
           currentCategoriesCopy = [...currentCategoriesCopy.slice(0,position), ...currentCategoriesCopy.slice(position+1)]
        } else {
           currentCategoriesCopy[position][property] = data
        }
        currentArtistCopy.categories = currentCategoriesCopy
        receiveCurrentArtist(currentArtistCopy)
    }

    getPhoto(currentArtist) {
        if( Object.getOwnPropertyNames(currentArtist).length > 0) {
            if(this.props.currentArtist.detail.photo.value === "" || !this.props.currentArtist.detail.photo.value) {
                return "https://s3.amazonaws.com/whisperinvest-images/default.png"
            } else {
                return this.props.currentArtist.detail.photo.value
            }
        } else {
            return "https://s3.amazonaws.com/whisperinvest-images/default.png"
        }
    }

    render() {
        let {currentArtist} = this.props
        let photo = this.getPhoto(currentArtist)
        return (
            <div className="ArtistCard">
                <CardComponent 
                    overlayTitle={<Category category={{required: true, categoryName: 'Nombre', categoryValue: currentArtist.detail.name.value, editableName: false, editableValue: true}}/>}
                    overlaySubtitle={<Category category={{required: true, categoryName: 'Apellido', categoryValue: currentArtist.detail.lastName.value, editableName: false, editableValue: true}}/>}
                    cardImage={photo}
                    cardTitle={<Category category={{required: true, categoryName: 'Email', categoryValue: currentArtist.detail.email.value, editableName: false, editableValue: false}}/>}
                    cardSubtitle={<Category category={{required: false, categoryName: 'Teléfono', categoryValue: getDetailValue(currentArtist.detail.phone.value), editableName: false, editableValue: true}}/>}
                    cardDescription={<CardDescription artistCardInformation={currentArtist} onTouchTap={this.handleAddCategory.bind(this)} handleCategoryValidation={this.handleCategoryValidation.bind(this)}/>}
                    cardActions={<CardActions artCardInformation={currentArtist}/>}
                />
            </div>
        )
  }
}

ArtistCard.displayName = 'ArtistCard'

ArtistCard.propTypes = {
  currentArtist: PropTypes.object,
  receiveCurrentArt: PropTypes.func,
  receiveCurrentArtist: PropTypes.func
}