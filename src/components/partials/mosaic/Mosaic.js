import React, {Component, PropTypes} from 'react'
import GridListComponent from '../../ui/grid-list/GridListComponent'
import * as constants from '../../../redux/constants'
import {connect} from 'react-redux'
import axios from 'axios'
import {NotificationTypes} from '../../../components/alerts/notifications/NotificationTypes'
import {handleError} from '../../../utils/errorHandling'
import {MosaicTypes} from '../../../utils/constants/MosaicTypes'
import './Mosaic.css'

class Mosaic extends Component {
  getArtDetail(card, receiveCurrentArt, showArtOverlayRecieved, addNotification, loadingGallery) {
    if(screen.width < 1024) {
        showArtOverlayRecieved(true)
    }
    loadingGallery(true)
    axios.get(`https://babelagunilla.herokuapp.com/api/getArtPieceDetail?id=${card._id}`)
    .then(function (response) {
      receiveCurrentArt(response.data)
      loadingGallery(false)
    })
    .catch(function (error) {
        addNotification({type: NotificationTypes.DANGER, contentType: "text", message: error.response.data})
        loadingGallery(false)
    })
  }

  getArtistDetail(card, receiveCurrentArtist, showArtistOverlayRecieved, addNotification, loadingArtistDetail) {
    showArtistOverlayRecieved(true)
    loadingArtistDetail(true)
    axios.get(`https://babelagunilla.herokuapp.com/api/getArtistDetail?id=${card._id}`)
    .then(function (response) {
        receiveCurrentArtist(response.data)
        loadingArtistDetail(false)
    })
    .catch(function (error) {
        addNotification({type: NotificationTypes.DANGER, contentType: "text", message: error.response.data})
        loadingArtistDetail(false)
    })
  }

  handleOnTouchTap(event, card, mosaicType) {
      let {receiveCurrentArt, receiveCurrentArtist, addNotification, showArtOverlayRecieved, showArtistOverlayRecieved, loadingArtDetail, loadingArtistDetail} = this.props

      if(mosaicType === MosaicTypes.ART) {
        this.getArtDetail(card, receiveCurrentArt, showArtOverlayRecieved, addNotification, loadingArtDetail)
      } else {
        this.getArtistDetail(card, receiveCurrentArtist, showArtistOverlayRecieved, addNotification, loadingArtistDetail)
      }
  }

  handleOnCheck(event, card) {
    event.stopImmediatePropagation()
    console.log(card)
  }
    
  render() {
    return (
      <div className="col-xs-12 Mosaic">
        {
          this.props.cardList && <GridListComponent 
                                    cardList={this.props.cardList}
                                    mosaicType={this.props.mosaicType}
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
}

export const mapDispatchToProps = dispatch => ({
  receiveCurrentArt: art => dispatch({type: constants.CURRENT_ART_RECEIVED, art}),
  receiveCurrentArtist: artist => dispatch({type: constants.CURRENT_ARTIST_RECEIVED, artist}),
  addNotification: notification => handleError(dispatch, notification),
  showArtOverlayRecieved: show => dispatch({type: constants.SHOW_ART_OVERLAY, show}),
  showArtistOverlayRecieved: show => dispatch({type: constants.SHOW_ARTIST_OVERLAY, show}),
  loadingArtistDetail: updatingCurrentArtist => dispatch({type: constants.UPDATING_CURRENT_ARTIST, updatingCurrentArtist}),
  loadingArtDetail: updatingCurrentArt => dispatch({type: constants.UPDATING_CURRENT_ART, updatingCurrentArt})
})

export default connect(null, mapDispatchToProps)(Mosaic)