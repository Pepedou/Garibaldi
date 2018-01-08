import React, { Component } from "react";
import PropTypes from "prop-types";
import * as constants from "../../redux/constants";
import { connect } from "react-redux";
import { handleError, ERROR_CODES } from "../../utils/errorHandling";
import Mosaic from "../../components/partials/mosaic/Mosaic";
import { MosaicTypes } from "../../utils/constants/MosaicTypes";
import LoaderComponent from "../../components/ui/loader/LoaderComponent";
import ArtistServices from "../../utils/services/artistServices";
import { NotificationTypes } from "../../components/alerts/notifications/NotificationTypes";

class ArtistsPage extends Component {
  componentWillMount() {
    let {
      clearAllNotifications,
      receiveArtistGallery,
      addNotification,
      loadingGallery
    } = this.props;
    clearAllNotifications();
    loadingGallery(true);

    ArtistServices.getAll()
      .then(function(response) {
        if (response.length > 0) {
          receiveArtistGallery(response);
        } else {
          addNotification(
            { code: ERROR_CODES.NO_CARDS_FOUND.code },
            NotificationTypes.INFO
          );
        }
        loadingGallery(false);
      })
      .catch(function(error) {
        addNotification(error);
        loadingGallery(false);
      });
  }

  render() {
    return (
      <div className="col-xs-12 col-md-12 ArtistsPage">
        <div className="row">
          {this.props.updatingArtistGallery ? (
            <div className="marginTop">
              <center>
                <LoaderComponent />
              </center>
            </div>
          ) : (
            <Mosaic
              cardList={this.props.artistGallery}
              mosaicType={MosaicTypes.ARTIST}
            />
          )}
        </div>
      </div>
    );
  }
}

ArtistsPage.displayName = "ArtistsPage";

ArtistsPage.propTypes = {
  artistGallery: PropTypes.array,
  receiveArtistGallery: PropTypes.func,
  addNotification: PropTypes.func,
  clearAllNotifications: PropTypes.func,
  loadingGallery: PropTypes.func,
  updatingArtistGallery: PropTypes.bool
};

export const mapStateToProps = ({ artistGallery, updatingArtistGallery }) => ({
  artistGallery,
  updatingArtistGallery
});

export const mapDispatchToProps = dispatch => ({
  receiveArtistGallery: artistGallery =>
    dispatch({ type: constants.ARTIST_GALLERY_RECIEVED, artistGallery }),
  addNotification: (notification, notificationType) =>
    handleError(dispatch, notification, notificationType),
  clearAllNotifications: () =>
    dispatch({ type: constants.CLEAR_ALL_NOTIFICATIONS }),
  loadingGallery: updatingArtistGallery =>
    dispatch({ type: constants.UPDATING_ARTIST_GALLERY, updatingArtistGallery })
});

export default connect(mapStateToProps, mapDispatchToProps)(ArtistsPage);
