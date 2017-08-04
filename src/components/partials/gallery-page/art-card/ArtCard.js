import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CardComponent from '../../../ui/card/CardComponent.js'
import CardDescription from './CardDescription'
import CardActions from './CardActions'
import Category from '../../../ui/category/Category'
import {getDetailValue} from '../../../../utils/fieldValidations'
require('./ArtCard.css')

export default class ArtCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOverlayVisible: false
        };
    }

    handleAddCategory(event) {
        let {receiveCurrentArt} = this.props
        let currentArtCopy = {...this.props.currentArt}
        let emptyCategory = {
            label: "Nombre de la categoría...",
            value: "Valor de la categoría..."
        }
        currentArtCopy.categories.push(emptyCategory)
        receiveCurrentArt(currentArtCopy)
    }

    handleCategoryValidation(data, position, property) {
        let {receiveCurrentArt} = this.props
        let currentArtCopy = {...this.props.currentArt}
        let currentCategoriesCopy = currentArtCopy.categories
        if(data === ""){
           currentCategoriesCopy = [...currentCategoriesCopy.slice(0,position), ...currentCategoriesCopy.slice(position+1)]
        } else {
           currentCategoriesCopy[position][property] = data
        }
        currentArtCopy.categories = currentCategoriesCopy
        receiveCurrentArt(currentArtCopy)
    }

    render() {
        let {showFullImageOverlayRecieved, currentArt} = this.props
        return (
            <div className="ArtCard">
                <div className="FullImage-button" onClick={() => showFullImageOverlayRecieved(true)}>Imagen completa</div>
                <CardComponent 
                    overlayTitle={<Category category={{required: true, categoryName: 'Obra', categoryValue: currentArt.detail.title.value, editableName: false, editableValue: true}}/>}
                    overlaySubtitle={<Category category={{required: false, categoryName: 'Año', categoryValue: getDetailValue(currentArt.detail.year.value.toString()), editableName: false, editableValue: true}}/>}
                    cardImage={currentArt.detail.images.value.standard}
                    cardTitle={<Category category={{required: true, categoryName: 'Artista', categoryValue: currentArt.detail.author.value, editableName: false, editableValue: false}}/>}
                    cardSubtitle={<Category category={{required: false, categoryName: 'Descripción', categoryValue: getDetailValue(currentArt.detail.description.value), editableName: false, editableValue: true}}/>}
                    cardDescription={<CardDescription artCardInformation={currentArt} onTouchTap={this.handleAddCategory.bind(this)}  handleCategoryValidation={this.handleCategoryValidation.bind(this)}/>}
                    cardActions={<CardActions artCardInformation={currentArt}/>}
                />
            </div>
        )
  }
}

ArtCard.displayName = 'ArtCard'

ArtCard.propTypes = {
  currentArt: PropTypes.object,
  receiveCurrentArt: PropTypes.func,
  showFullImageOverlayRecieved: PropTypes.func
}