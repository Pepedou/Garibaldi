import React, {Component, PropTypes} from 'react'
import CardComponent from '../../../ui/card/CardComponent.js'
import {connect} from 'react-redux'
import CardDescription from './CardDescription'
import CardActions from './CardActions'
require('./ArtCard.css')

export default class ArtCard extends Component {
    handleAddCategory(artCardInformationCopy) {
        let emptyCategory = {
            label: "Nombre de la categoría...",
            value: "Valor de la categoría..."
        }
        artCardInformationCopy.categories.push(emptyCategory);
        //TODO: Poner el dispatch para actualizar detalle
    }

    render() {
        return (
            <div className="ArtCard">
                <CardComponent 
                headerTitle={this.props.currentArt.detail.title}
                headerSubtitle={this.props.currentArt.detail.year}
                overlayTitle={this.props.currentArt.detail.title}
                overlaySubtitle={this.props.currentArt.detail.year}
                cardImage={this.props.currentArt.detail.source}
                cardTitle={this.props.currentArt.detail.author}
                cardSubtitle={this.props.currentArt.detail.description}
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