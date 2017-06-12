import React, {Component, PropTypes} from 'react'
import CardComponent from '../../ui/card/CardComponent.js'
import {connect} from 'react-redux'
import CardDescription from './CardDescription'
import CardActions from './CardActions'
require('./ArtCard.css')

export default class ArtCard extends Component {
    constructor(props)
    {
        super(props)

        this.state = {
            artCardInformation: props.currentArt
        }
    }

    handleAddCategory(artCardInformationCopy) {
        let emptyCategory = {
            required: false,
            editableName: true,
            editableValue: true,
            categoryName: "Nombre de la categoría...",
            categoryValue: "Valor de la categoría..."
        }
        artCardInformationCopy.categories.push(emptyCategory);
        this.setState({
            artCardInformation: artCardInformationCopy
        })
    }

    render() {
        return (
            <div className="ArtCard">
                <CardComponent 
                headerTitle={this.state.artCardInformation.title}
                headerSubtitle={this.state.artCardInformation.year}
                overlayTitle={this.state.artCardInformation.title}
                overlaySubtitle={this.state.artCardInformation.year}
                cardImage={this.state.artCardInformation.source}
                cardTitle={this.state.artCardInformation.artist}
                cardSubtitle={this.state.artCardInformation.description}
                cardDescription={<CardDescription artCardInformation={this.state.artCardInformation} onTouchTap={this.handleAddCategory.bind(this)}/>}
                cardActions={<CardActions artCardInformation={this.state.artCardInformation}/>}
                />
            </div>
        )
  }
}

ArtCard.displayName = 'ArtCard'

ArtCard.propTypes = {
  currentArt: PropTypes.object
}