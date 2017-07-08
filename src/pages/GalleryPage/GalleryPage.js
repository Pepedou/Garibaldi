import React, {Component, PropTypes} from 'react'
import * as constants from '../../redux/constants'
import {connect} from 'react-redux'
import Mosaic from '../../components/partials/gallery-page/mosaic/Mosaic'
import ArtCard from '../../components/partials/gallery-page/art-card/ArtCard'
import {NotificationTypes} from '../../components/alerts/notifications/NotificationTypes'
import {handleError} from '../../utils/errorHandling'
import axios from 'axios'
import {MosaicTypes} from '../../utils/constants/MosaicTypes'
import './GalleryPage.css'

class GalleryPage extends Component {
    componentWillMount() {
        let {clearAllNotifications, receiveArtGallery, addNotification, currentUser} = this.props
        clearAllNotifications()
        axios.get(`https://babelagunilla.herokuapp.com/api/mosaic?email=${currentUser.email}`)
        .then(function (response) {
          if(response.data.length > 0) {
            receiveArtGallery(response.data);
          } else {
            addNotification({type: NotificationTypes.DANGER, contentType: "text", message: "No hay resultados para la búsqueda especificada"});
          }
        })
        .catch(function (error) {
          addNotification({type: NotificationTypes.DANGER, contentType: "text", message: error.response.data});
        })
    }

    render() {
        let artCard = this.props.artGallery.length > 0 ? <ArtCard currentArt={this.props.currentArt}/> : null
        return (
        <div className="col-xs-12 col-md-12 GalleryPage">
            <div className="row">
                <div className="col-xs-12 col-md-12">
                    <div className="row">
                        <Mosaic cardList={this.props.artGallery} mosaicType={MosaicTypes.ART}/>
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
  receiveArtGallery: PropTypes.func,
  addNotification: PropTypes.func,
  clearAllNotifications: PropTypes.func
}

export const mapStateToProps = ({artGallery, currentUser}) => ({
  artGallery, currentUser
})

export const mapDispatchToProps = dispatch => ({
  receiveArtGallery: artGallery => dispatch({type: constants.ART_GALLERY_RECIEVED, artGallery}),
  addNotification: notification => handleError(dispatch, notification),
  clearAllNotifications: () => dispatch({type: constants.CLEAR_ALL_NOTIFICATIONS}),
})

export default connect(mapStateToProps, mapDispatchToProps)(GalleryPage)