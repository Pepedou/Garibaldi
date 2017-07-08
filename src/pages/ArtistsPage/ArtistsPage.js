import React, {Component, PropTypes} from 'react';
import * as constants from '../../redux/constants'
import {connect} from 'react-redux'
import axios from 'axios'
import {NotificationTypes} from '../../components/alerts/notifications/NotificationTypes'
import {handleError} from '../../utils/errorHandling'
import Mosaic from '../../components/partials/gallery-page/mosaic/Mosaic'
import {MosaicTypes} from '../../utils/constants/MosaicTypes'

class ArtistsPage extends Component {
    componentWillMount() {
        let {clearAllNotifications, receiveArtistGallery, addNotification, currentUser} = this.props
        clearAllNotifications()
        axios.get(`https://babelagunilla.herokuapp.com/api/artists`)
        .then(function (response) {
          if(response.data.length > 0) {
            receiveArtistGallery(response.data);
          } else {
            addNotification({type: NotificationTypes.DANGER, contentType: "text", message: "No hay resultados para la búsqueda especificada"});
          }
        })
        .catch(function (error) {
          addNotification({type: NotificationTypes.DANGER, contentType: "text", message: error.response.data});
        })
    }

    render() {
        return (
        <div className="col-xs-12 col-md-12 ArtistsPage">
            <div className="row">
                <div className="col-xs-12 col-md-12">
                    <div className="row">
                        <Mosaic cardList={this.props.artistGallery}  mosaicType={MosaicTypes.ARTIST}/>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

ArtistsPage.displayName = 'ArtistsPage'

ArtistsPage.propTypes = {
  artistGallery: PropTypes.array,
  receiveArtistGallery: PropTypes.func,
  addNotification: PropTypes.func,
  clearAllNotifications: PropTypes.func
}

export const mapStateToProps = ({artistGallery, currentUser}) => ({
  artistGallery, currentUser
})

export const mapDispatchToProps = dispatch => ({
  receiveArtistGallery: artistGallery => dispatch({type: constants.ARTIST_GALLERY_RECIEVED, artistGallery}),
  addNotification: notification => handleError(dispatch, notification),
  clearAllNotifications: () => dispatch({type: constants.CLEAR_ALL_NOTIFICATIONS}),
})

export default connect(mapStateToProps, mapDispatchToProps)(ArtistsPage)