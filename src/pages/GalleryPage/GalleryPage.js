import React, {Component, PropTypes} from 'react'
import * as constants from '../../redux/constants'
import {connect} from 'react-redux'
import Mosaic from '../../components/partials/gallery-page/mosaic/Mosaic'
// import ArtCard from '../../components/partials/gallery-page/art-card/ArtCard'
import {NotificationTypes} from '../../components/alerts/notifications/NotificationTypes'
import {handleError} from '../../utils/errorHandling'
import axios from 'axios'
import './GalleryPage.css'

class GalleryPage extends Component {
    componentWillMount() {
        let {clearAllNotifications, receiveArtGallery, receiveCurrentArt, addNotification, currentUser} = this.props
        clearAllNotifications()
        axios.get(`https://babelagunilla.herokuapp.com//api/mosaic?email=${currentUser.email}`)
        .then(function (response) {
          if(response.data.length > 0) {
            receiveArtGallery(response.data);
            receiveCurrentArt(response.data[0]);
          } else {
            addNotification({type: NotificationTypes.DANGER, contentType: "text", message: "No hay resultados para la búsqueda especificada"});
          }
        })
        .catch(function (error) {
          addNotification({type: NotificationTypes.DANGER, contentType: "text", message: error.response.data});
        })
    }

    render() {
        // let artCard = this.props.artGallery.length > 0 ? <ArtCard currentArt={this.props.currentArt}/> : null
        return (
            <div className="col-xs-12 col-md-12 GalleryPage">
                <div className="row">
                    <div className="col-xs-12 col-md-8">
                        <div className="row">
                            <Mosaic artGallery={this.props.artGallery}/>
                        </div>
                    </div>
                    <div className="ArtPanelColumn col-xs-12 col-md-4">
                        <div className="row">
                            <div className="col-xs-12 col-md-12">
                                {/*{
                                    artCard
                                }*/}
                            </div>
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
  receiveArtGallery: PropTypes.func,
  receiveCurrentArt: PropTypes.func,
  addNotification: PropTypes.func,
  clearAllNotifications: PropTypes.func
}

export const mapStateToProps = ({artGallery, currentArt, currentUser}) => ({
  artGallery, currentArt, currentUser
})

export const mapDispatchToProps = dispatch => ({
  receiveArtGallery: artGallery => dispatch({type: constants.ART_GALLERY_RECIEVED, artGallery}),
  receiveCurrentArt: art => dispatch({type: constants.CURRENT_ART_RECEIVED, art}),
  addNotification: notification => handleError(dispatch, notification),
  clearAllNotifications: () => dispatch({type: constants.CLEAR_ALL_NOTIFICATIONS}),
})

export default connect(mapStateToProps, mapDispatchToProps)(GalleryPage)