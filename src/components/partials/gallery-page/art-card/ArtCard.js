import React, {Component, PropTypes} from 'react'
import CardComponent from '../../../ui/card/CardComponent.js'
import {connect} from 'react-redux'
import CardDescription from './CardDescription'
import CardActions from './CardActions'
require('./ArtCard.css')

export default class ArtCard extends Component {
    handleAddCategory(artCardInformationCopy) {
        let emptyCategory = {
            required: false,
            editableName: true,
            editableValue: true,
            categoryName: "Nombre de la categoría...",
            categoryValue: "Valor de la categoría..."
        }
        artCardInformationCopy.categories.push(emptyCategory);
        //TODO: Poner el dispatch para actualizar detalle
    }

    render() {
        return (
            <div className="ArtCard">
                <CardComponent 
                headerTitle={this.props.currentArt.title}
                headerSubtitle={this.props.currentArt.year}
                overlayTitle={this.props.currentArt.title}
                overlaySubtitle={this.props.currentArt.year}
                cardImage={this.props.currentArt.source}
                cardTitle={this.props.currentArt.artist}
                cardSubtitle={this.props.currentArt.description}
                cardDescription={<CardDescription artCardInformation={this.props.currentArt} onTouchTap={this.handleAddCategory.bind(this)}/>}
                cardActions={<CardActions artCardInformation={this.props.currentArt}/>}
                />
            </div>
        )
  }
}

ArtCard.displayName = 'ArtCard'

ArtCard.propTypes = {
  currentArt: PropTypes.object
}