import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as constants from '../../redux/constants'
import {connect} from 'react-redux'
import Mosaic from '../../components/partials/mosaic/Mosaic'
import ArtCard from '../../components/partials/gallery-page/art-card/ArtCard'
import {handleError, ERROR_CODES} from '../../utils/errorHandling'
import LoaderComponent from '../../components/ui/loader/LoaderComponent'
import axios from 'axios'
import {MosaicTypes} from '../../utils/constants/MosaicTypes'
import apiRoutes from '../../utils/services/apiRoutes'
import ArtPieceServices from '../../utils/services/artPiecesServices'
import {NotificationTypes} from '../../components/alerts/notifications/NotificationTypes'
import './GalleryPage.css'

class GalleryPage extends Component {
    getArtDetail(cardId, receiveCurrentArt, addNotification, loadingArtDetail) {
      loadingArtDetail(true)

      ArtPieceServices.getDetail(cardId)
        .then(function (response) {
            receiveCurrentArt(response)
            loadingArtDetail(false)
        })
        .catch(function (error) {
            addNotification(error)
            loadingArtDetail(false)
        })
    }

    componentWillMount() {
        let {clearAllNotifications, receiveArtGallery, receiveCurrentArt, addNotification, currentUser, loadingGallery, loadingArtDetail} = this.props
        let getArtDetail = this.getArtDetail
        clearAllNotifications()
        loadingGallery(true)
        
        axios.get(`${apiRoutes.getServiceUrl()}/api/ArtPieces/mosaic`, {params: {credential: currentUser}})
        .then(function (response) {
          if(response.data.length > 0) {
            getArtDetail(response.data[0].id, receiveCurrentArt, addNotification, loadingArtDetail)
            receiveArtGallery(response.data);
            loadingGallery(false)
          } else {
            addNotification({code: ERROR_CODES.NO_CARDS_FOUND.code}, NotificationTypes.INFO)
            loadingGallery(false)
        }
        })
        .catch(function (error) {
          addNotification(error.response.data.error)
          loadingGallery(false)
        })
    }

    render() {
        return (
        <div className="col-xs-12 col-md-12 GalleryPage">
            <div className="row">
                <div className="col-xs-12 col-md-8">
                    <div className="row">
                        {
                            this.props.updatingArtGallery 
                            ? <div className="marginTop"><center><LoaderComponent/></center></div>
                            : <Mosaic cardList={this.props.artGallery} mosaicType={MosaicTypes.ART}/>
                        }
                    </div>
                </div>
                <div className="col-xs-0 col-md-4 ArtDetailSection">
                    <div className="row">
                        {
                            this.props.updatingCurrentArt
                            ? <div className="marginTop"><center><LoaderComponent/></center></div>
                            : Object.getOwnPropertyNames(this.props.currentArt).length > 0 ? <ArtCard {...this.props}/> : null
                        }
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

GalleryPage.displayName = 'GalleryPage'

GalleryPage.propTypes = {
  artGallery: PropTypes.array,
  currentArt: PropTypes.object,
  sourceImage: PropTypes.string,
  updatingArtGallery: PropTypes.bool,
  receiveArtGallery: PropTypes.func,
  receiveCurrentArt: PropTypes.func,
  addNotification: PropTypes.func,
  clearAllNotifications: PropTypes.func,
  loadingGallery: PropTypes.func,
  loadingArtDetail: PropTypes.func,
  updatingCurrentArt: PropTypes.bool,
  showFullImageOverlayRecieved: PropTypes.func,
  showDropZoneOverlayRecieved: PropTypes.func,
  addCheckCard: PropTypes.func,
  deleteCheckCard: PropTypes.func
}

export const mapStateToProps = ({artGallery, currentArt, currentUser, updatingArtGallery, updatingCurrentArt, sourceImage}) => ({
  artGallery, currentArt, currentUser, updatingArtGallery, updatingCurrentArt, sourceImage
})

export const mapDispatchToProps = dispatch => ({
  receiveArtGallery: artGallery => dispatch({type: constants.ART_GALLERY_RECIEVED, artGallery}),
  receiveCurrentArt: art => dispatch({type: constants.CURRENT_ART_RECEIVED, art}),
  addNotification: (notification, notificationType) => handleError(dispatch, notification, notificationType),
  clearAllNotifications: () => dispatch({type: constants.CLEAR_ALL_NOTIFICATIONS}),
  loadingGallery: updatingArtGallery => dispatch({type: constants.UPDATING_ART_GALLERY, updatingArtGallery}),
  loadingArtDetail: updatingCurrentArt => dispatch({type: constants.UPDATING_CURRENT_ART, updatingCurrentArt}),
  showFullImageOverlayRecieved: show => dispatch({type: constants.SHOW_FULL_IMAGE_OVERLAY, show}),
  showDropZoneOverlayRecieved: show => dispatch({type: constants.SHOW_DROPZONE_OVERLAY, show}),
  addCheckCard: cardId => dispatch({type: constants.ADD_CHECK_CARD, cardId}),
  deleteCheckCard: cardId => dispatch({type: constants.DELETE_CHECK_CARD, cardId})
})

export default connect(mapStateToProps, mapDispatchToProps)(GalleryPage)