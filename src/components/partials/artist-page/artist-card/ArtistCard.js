require("./ArtistCard.css")

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CardComponent from '../../../ui/card/CardComponent.js'
import CardDescription from './CardDescription'
import CardActions from './CardActions'
import Category from '../../../ui/category/Category'

export default class ArtistCard extends Component {
    handleAddCategory(event) {
        let currentArtistCopy = {...this.props.currentArtist}
        let emptyCategory = {
            label: "Nombre de la categoría...",
            value: "Valor de la categoría..."
        }
        currentArtistCopy.categories.push(emptyCategory)
        this.props.receiveCurrentArtist(currentArtistCopy)
    }

    render() {
        return (
            <div className="ArtistCard">
                <CardComponent 
                    overlayTitle={<Category category={{required: true, categoryName: 'Nombre', categoryValue: this.props.currentArtist.detail.name.value, editableName: false, editableValue: true}}/>}
                    overlaySubtitle={<Category category={{required: true, categoryName: 'Apellido', categoryValue: this.props.currentArtist.detail.lastName.value, editableName: false, editableValue: true}}/>}
                    cardImage={this.props.currentArtist.detail.photo.value}
                    cardTitle={<Category category={{required: true, categoryName: 'Correo electrónico', categoryValue: this.props.currentArtist.detail.email.value, editableName: false, editableValue: true}}/>}
                    cardSubtitle={<Category category={{required: false, categoryName: 'Teléfono', categoryValue: this.props.currentArtist.detail.phone.value, editableName: false, editableValue: true}}/>}
                    cardDescription={<CardDescription artistCardInformation={this.props.currentArtist} onTouchTap={this.handleAddCategory.bind(this)}/>}
                    cardActions={<CardActions artCardInformation={this.props.currentArtist}/>}
                />
            </div>
        )
  }
}

ArtistCard.displayName = 'ArtistCard'

ArtistCard.propTypes = {
  currentArtist: PropTypes.object,
  receiveCurrentArtist: PropTypes.func
}