import React, {Component} from 'react';
import PropTypes from 'prop-types';
import GridListComponent from '../../ui/grid-list/GridListComponent'
import * as constants from '../../../redux/constants'
import {connect} from 'react-redux'
import {handleError} from '../../../utils/errorHandling'
import {MosaicTypes} from '../../../utils/constants/MosaicTypes'
import ArtPieceServices from '../../../utils/services/artPiecesServices'
import ArtistServices from '../../../utils/services/artistServices'
import './Mosaic.css'

class Mosaic extends Component {
  getArtDetail(card, receiveCurrentArt, showArtOverlayRecieved, addNotification, loadingGallery) {
    if(window.screen.width < 1024) {
        showArtOverlayRecieved(true)
    }
    loadingGallery(true)

    ArtPieceServices.getDetail(card.id)
    .then(function (response) {
        receiveCurrentArt(response)
        loadingGallery(false)
    })
    .catch(function (error) {
        showArtOverlayRecieved(false)
        loadingGallery(false)
        addNotification(error)
    })
  }

  getArtistDetail(card, receiveCurrentArtist, showArtistOverlayRecieved, addNotification, loadingArtistDetail, extraImagesReceived) {
    showArtistOverlayRecieved(true)
    loadingArtistDetail(true)

    ArtistServices.getDetail(card.id)
    .then(function (response) {
        receiveCurrentArtist(response)
        //extraImagesReceived(response.extraImages) TODO: Descomentar cuando el get regrese este dato
        loadingArtistDetail(false)
    })
    .catch(function (error) {
        showArtistOverlayRecieved(false)
        loadingArtistDetail(false)
        addNotification(error)
    })
  }

  handleOnTouchTap(event, card, mosaicType) {
      if(event.target.type !== "checkbox") {
        let {receiveCurrentArt, receiveCurrentArtist, addNotification, showArtOverlayRecieved, showArtistOverlayRecieved, loadingArtDetail, 
          loadingArtistDetail, clearAllNotifications, extraImagesReceived} = this.props
        clearAllNotifications()
        if(mosaicType === MosaicTypes.ART) {
          this.getArtDetail(card, receiveCurrentArt, showArtOverlayRecieved, addNotification, loadingArtDetail)
        } else {
          this.getArtistDetail(card, receiveCurrentArtist, showArtistOverlayRecieved, addNotification, loadingArtistDetail, extraImagesReceived)
        }
      }
  }

  handleOnCheck(event, card, addCheckCard, deleteCheckCard) {
    if(event.target.checked) {
      addCheckCard(card.id)
    } else {
      deleteCheckCard(card.id)
    }
  }
    
  render() {
    let {cardList, mosaicType, addCheckCard, deleteCheckCard} = this.props
    return (
      <div className="col-xs-12 Mosaic">
        {
          cardList && <GridListComponent 
                                    cardList={cardList}
                                    mosaicType={mosaicType}
                                    addCheckCard={addCheckCard}
                                    deleteCheckCard={deleteCheckCard}
                                    onTouchTap={this.handleOnTouchTap.bind(this)}
                                    onCheck={this.handleOnCheck.bind(this)}/>
        }
      </div>
    )
  }
}

Mosaic.displayName = 'Mosaic'

Mosaic.propTypes = {
  cardList: PropTypes.array,
  mosaicType: PropTypes.number,
  receiveCurrentArt: PropTypes.func,
  receiveCurrentArtist: PropTypes.func,
  addNotification: PropTypes.func,
  loadingArtistDetail: PropTypes.func,
  loadingArtDetail: PropTypes.func,
  addCheckCard: PropTypes.func,
  deleteCheckCard: PropTypes.func,
  clearAllNotifications: PropTypes.func,
  extraImagesReceived: PropTypes.func
}

export const mapDispatchToProps = dispatch => ({
  receiveCurrentArt: art => dispatch({type: constants.CURRENT_ART_RECEIVED, art}),
  receiveCurrentArtist: artist => dispatch({type: constants.CURRENT_ARTIST_RECEIVED, artist}),
  addNotification: notification => handleError(dispatch, notification),
  showArtOverlayRecieved: show => dispatch({type: constants.SHOW_ART_OVERLAY, show}),
  showArtistOverlayRecieved: show => dispatch({type: constants.SHOW_ARTIST_OVERLAY, show}),
  loadingArtistDetail: updatingCurrentArtist => dispatch({type: constants.UPDATING_CURRENT_ARTIST, updatingCurrentArtist}),
  loadingArtDetail: updatingCurrentArt => dispatch({type: constants.UPDATING_CURRENT_ART, updatingCurrentArt}),
  addCheckCard: cardId => dispatch({type: constants.ADD_CHECK_CARD, cardId}),
  deleteCheckCard: cardId => dispatch({type: constants.DELETE_CHECK_CARD, cardId}),
  clearAllNotifications: () => dispatch({type: constants.CLEAR_ALL_NOTIFICATIONS}),
  extraImagesReceived: image => dispatch({type: constants.EXTRA_IMAGES_RECIEVED, image})
})

export default connect(null, mapDispatchToProps)(Mosaic)