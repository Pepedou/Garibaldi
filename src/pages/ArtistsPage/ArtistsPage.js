import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as constants from '../../redux/constants'
import {connect} from 'react-redux'
import axios from 'axios'
import {handleError, ERROR_CODES} from '../../utils/errorHandling'
import Mosaic from '../../components/partials/mosaic/Mosaic'
import {MosaicTypes} from '../../utils/constants/MosaicTypes'
import apiRoutes from '../../utils/services/apiRoutes'
import LoaderComponent from '../../components/ui/loader/LoaderComponent'

class ArtistsPage extends Component {
    componentWillMount() {
        let {clearAllNotifications, receiveArtistGallery, addNotification, loadingGallery} = this.props
        clearAllNotifications()
        loadingGallery(true)
        axios.get(`${apiRoutes.getServiceUrl()}/api/Artists`) //TODO: Usar mosaico
        .then(function (response) {
          if(response.data.length > 0) {
            receiveArtistGallery(response.data);
          } else {
            addNotification({code: ERROR_CODES.NO_RESULTS_FOUND.code})
          }
          loadingGallery(false)
        })
        .catch(function (error) {
          addNotification(error.response.data.error)
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