import React, { Component } from "react";
import PropTypes from "prop-types";
import { getFilterOptions } from "../../../utils/filterUtils";
import { PageTypes } from "../../../utils/constants/PageTypes";
import axios from "axios";
import { ERROR_CODES } from "../../../utils/errorHandling";
import apiRoutes from "../../../utils/services/apiRoutes";
import ArtPieceServices from "../../../utils/services/artPiecesServices";
require("./SearchBar.css");
require("../../../Main.css");

export default class SearchBar extends Component {
  filterArtists(
    value,
    filter,
    {
      addNotification,
      clearAllNotifications,
      receiveArtistGallery,
      updateArtGallery
    }
  ) {
    axios
      .get(`${apiRoutes.getServiceUrl()}/api/Artists`, {
        params: {
          filter: { where: { [filter]: { like: value, options: "i" } } }
        }
      })
      .then(function(response) {
        updateArtGallery(false);
        receiveArtistGallery(response.data);

        if (response.data.length === 0) {
          clearAllNotifications();
          addNotification({ code: ERROR_CODES.NO_RESULTS_FOUND.code });
        }
      })
      .catch(function(error) {
        updateArtGallery(false);
        clearAllNotifications();
        if (error.response) {
          addNotification(error.response.data.error);
        } else {
          addNotification(error);
        }
      });
  }

  getArtDetail(
    cardId,
    receiveCurrentArt,
    addNotification,
    loadingArtDetail,
    clearAllNotifications
  ) {
    loadingArtDetail(true);

    ArtPieceServices.getDetail(cardId)
      .then(function(response) {
        receiveCurrentArt(response);
        loadingArtDetail(false);
      })
      .catch(function(error) {
        clearAllNotifications();
        addNotification(error);
        loadingArtDetail(false);
      });
  }

  filterArt(
    value,
    filter,
    {
      addNotification,
      clearAllNotifications,
      receiveArtGallery,
      receiveCurrentArt,
      updateArtGallery,
      loadingArtDetail,
      currentUser
    }
  ) {
    let getArtDetail = this.getArtDetail;
    axios
      .get(`${apiRoutes.getServiceUrl()}/api/ArtPieces/mosaic`, {
        params: {
          credential: currentUser,
          filters: { [filter]: { like: value, options: "i" } }
        }
      })
      .then(function(response) {
        updateArtGallery(false);
        receiveArtGallery(response.data);

        if (response.data.length > 0) {
          loadingArtDetail(true);
          getArtDetail(
            response.data[0].id,
            receiveCurrentArt,
            addNotification,
            loadingArtDetail,
            clearAllNotifications
          );
        } else {
          clearAllNotifications();
          receiveCurrentArt({});
          addNotification({ code: ERROR_CODES.NO_RESULTS_FOUND.code });
        }
      })
      .catch(function(error) {
        clearAllNotifications();
        updateArtGallery(false);
        if (error.response) {
          addNotification(error.response.data.error);
        } else {
          addNotification(error);
        }
      });
  }

  handleOnChange(event, props) {
    var value = document.getElementById("filterInput").value;
    var filter = document.getElementById("filterTypeSelect").value;

    props.clearAllNotifications();
    props.updateArtGallery(true);

    if (window.location.pathname === "/home") {
      this.filterArt(value, filter, props);
    } else {
      this.filterArtists(value, filter, props);
    }
  }

  render() {
    let page =
      window.location.pathname === "/home"
        ? PageTypes.ART_GALLERY
        : PageTypes.ARTISTS;
    let { currentUser } = this.props;
    return (
      <div className="SearchBar">
        <input
          type="text"
          className="searchElement"
          placeholder="Filtrar información..."
          id="filterInput"
          onChange={event => this.handleOnChange(event, this.props)}
        />
        <select className="searchElement" id="filterTypeSelect">
          {getFilterOptions(currentUser, page).map((item, key) => (
            <option value={item.value} key={key}>
              {item.filter}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

SearchBar.displayName = "ProfileNavBar";

SearchBar.propTypes = {
  currentUser: PropTypes.object,
  receiveArtGallery: PropTypes.func,
  receiveCurrentArt: PropTypes.func,
  addNotification: PropTypes.func,
  clearAllNotifications: PropTypes.func,
  updateArtGallery: PropTypes.func,
  receiveArtistGallery: PropTypes.func
};
