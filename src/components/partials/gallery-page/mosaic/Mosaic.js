import React, {Component, PropTypes} from 'react'
import GridListComponent from '../../../ui/grid-list/GridListComponent'
import * as constants from '../../../../redux/constants'
import {connect} from 'react-redux'
import axios from 'axios'
import {NotificationTypes} from '../../../../components/alerts/notifications/NotificationTypes'
import {handleError} from '../../../../utils/errorHandling'
import {MosaicTypes} from '../../../../utils/constants/MosaicTypes'
import './Mosaic.css'

class Mosaic extends Component {
  handleOnTouchTap(event, card, mosaicType) {
      let receiveCurrentArt = this.props.receiveCurrentArt
      let receiveCurrentArtist = this.props.receiveCurrentArtist
      let addNotification = this.props.addNotification

      let servicePath = mosaicType === MosaicTypes.ART 
        ? `https://babelagunilla.herokuapp.com/api/getArtPieceDetail?id=${card._id}`
        : `https://babelagunilla.herokuapp.com/api/getArtistDetail?id=${card._id}`

      axios.get(servicePath)
      .then(function (response) {
        if(mosaicType === MosaicTypes.ART) {
          receiveCurrentArt(response.data)
        } else {
          receiveCurrentArtist(response.data)
        }
      })
      .catch(function (error) {
          addNotification({type: NotificationTypes.DANGER, contentType: "text", message: error.response.data});
      })
  }

  handleOnCheck(event, card) {
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
  addNotification: PropTypes.func
}

export const mapDispatchToProps = dispatch => ({
  receiveCurrentArt: art => dispatch({type: constants.CURRENT_ART_RECEIVED, art}),
  receiveCurrentArtist: artist => dispatch({type: constants.CURRENT_ARTIST_RECEIVED, artist}),
  addNotification: notification => handleError(dispatch, notification)
})

export default connect(null, mapDispatchToProps)(Mosaic)