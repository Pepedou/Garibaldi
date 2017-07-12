import React, {Component, PropTypes} from 'react'
import CardComponent from '../../../ui/card/CardComponent.js'
import CardDescription from './CardDescription'
import CardActions from './CardActions'
import Category from '../../../ui/category/Category'
require('./ArtCard.css')

export default class ArtCard extends Component {
    handleAddCategory(event) {
        let currentArtCopy = {...this.props.currentArt}
        let emptyCategory = {
            label: "Nombre de la categoría...",
            value: "Valor de la categoría..."
        }
        currentArtCopy.categories.push(emptyCategory)
        this.props.receiveCurrentArt(currentArtCopy)
    }

    render() {
        return (
            <div className="ArtCard">
                <CardComponent 
                    overlayTitle={<Category category={{required: true, categoryName: 'Obra', categoryValue: this.props.currentArt.detail.title.value, editableName: false, editableValue: true}}/>}
                    overlaySubtitle={<Category category={{required: false, categoryName: 'Año', categoryValue: this.props.currentArt.detail.year.value, editableName: false, editableValue: true}}/>}
                    cardImage={this.props.currentArt.detail.source.value}
                    cardTitle={<Category category={{required: true, categoryName: 'Artista', categoryValue: this.props.currentArt.detail.author.value, editableName: false, editableValue: true}}/>}
                    cardSubtitle={<Category category={{required: false, categoryName: 'Descripción', categoryValue: this.props.currentArt.detail.description.value, editableName: false, editableValue: true}}/>}
                    cardDescription={<CardDescription artCardInformation={this.props.currentArt} onTouchTap={this.handleAddCategory.bind(this)}/>}
                    cardActions={<CardActions artCardInformation={this.props.currentArt}/>}
                />
            </div>
        )
  }
}

ArtCard.displayName = 'ArtCard'

ArtCard.propTypes = {
  currentArt: PropTypes.object,
  receiveCurrentArt: PropTypes.func
}