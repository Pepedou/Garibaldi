import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as constants from '../../redux/constants'
import {connect} from 'react-redux'
import axios from 'axios'
import {NotificationTypes} from '../../components/alerts/notifications/NotificationTypes'
import {handleError} from '../../utils/errorHandling'
import Mosaic from '../../components/partials/mosaic/Mosaic'
import {MosaicTypes} from '../../utils/constants/MosaicTypes'
import LoaderComponent from '../../components/ui/loader/LoaderComponent'

class ArtistsPage extends Component {
    componentWillMount() {
        let {clearAllNotifications, receiveArtistGallery, addNotification, loadingGallery} = this.props
        clearAllNotifications()
        loadingGallery(true)
        axios.get(`https://lazarocardenas.herokuapp.com/api/Artists`)
        .then(function (response) {
          if(response.data.length > 0) {
            receiveArtistGallery(response.data);
          } else {
            addNotification({type: NotificationTypes.DANGER, contentType: "text", message: "No hay resultados para la búsqueda especificada"});
          }
          loadingGallery(false)
        })
        .catch(function (error) {
          addNotification({type: NotificationTypes.DANGER, contentType: "text", message: error.response.data});
          loadingGallery(false)
        })
    }

    render() {
        return (
          <div className="col-xs-12 col-md-12 ArtistsPage">
              <div className="row">
                  {
                    this.props.updatingArtistGallery
                    ? <div className="marginTop"><center><LoaderComponent/></center></div>
                    : <Mosaic cardList={this.props.artistGallery}  mosaicType={MosaicTypes.ARTIST}/>
                  }
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
  clearAllNotifications: PropTypes.func,
  loadingGallery: PropTypes.func,
  updatingArtistGallery: PropTypes.bool
}

export const mapStateToProps = ({artistGallery, updatingArtistGallery}) => ({
  artistGallery, updatingArtistGallery
})

export const mapDispatchToProps = dispatch => ({
  receiveArtistGallery: artistGallery => dispatch({type: constants.ARTIST_GALLERY_RECIEVED, artistGallery}),
  addNotification: notification => handleError(dispatch, notification),
  clearAllNotifications: () => dispatch({type: constants.CLEAR_ALL_NOTIFICATIONS}),
  loadingGallery: updatingArtistGallery => dispatch({type: constants.UPDATING_ARTIST_GALLERY, updatingArtistGallery})
})

export default connect(mapStateToProps, mapDispatchToProps)(ArtistsPage)