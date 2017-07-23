import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getFilterOptions, getFilterService} from '../../../utils/filterUtils'
import {PageTypes} from '../../../utils/constants/PageTypes'
import * as constants from '../../../redux/constants'
import {connect} from 'react-redux'
import axios from 'axios'
import {NotificationTypes} from '../../../components/alerts/notifications/NotificationTypes'
import {handleError} from '../../../utils/errorHandling'
require('./SearchBar.css')
require('../../../Main.css')

class SearchBar extends Component {
  handleOnClick(event, {addNotification, clearAllNotifications, receiveArtGallery, receiveCurrentArt, updateArtGallery}) {
    var value = document.getElementById("filterInput").value
    var filter = document.getElementById("filterTypeSelect").value

    clearAllNotifications()
    updateArtGallery(true)
    let serviceName = getFilterService()
    axios.get(`${serviceName}?filter=${filter}&value=${value}`)
    .then(function (response) {
        updateArtGallery(false)
        receiveArtGallery(response.data);
        receiveCurrentArt(response.data[0]);
    })
    .catch(function (error) {
        updateArtGallery(false)
        addNotification({type: NotificationTypes.DANGER, contentType: "text", message: error.response.data});
    })
  }

  render() {
    return (
      <div className="SearchBar">
        <input type="text" className="searchElement" placeholder="Filtrar información..." id="filterInput"/>
        <select className="searchElement" id="filterTypeSelect">
          {
            getFilterOptions(this.props.currentUser, PageTypes.ART_GALLERY).map((item, key) => <option value={item.value} key={key}>{item.filter}</option>)
          }
        </select>
      </div>
    );
  }
}

SearchBar.displayName = 'ProfileNavBar'

SearchBar.propTypes = {
  currentUser: PropTypes.object,
  receiveArtGallery: PropTypes.func,
  receiveCurrentArt: PropTypes.func,
  addNotification: PropTypes.func,
  clearAllNotifications: PropTypes.func,
  updateArtGallery: PropTypes.func
};

export const mapStateToProps = ({currentUser}) => ({
  currentUser
})

export const mapDispatchToProps = dispatch => ({
  receiveArtGallery: artGallery => dispatch({type: constants.ART_GALLERY_RECIEVED, artGallery}),
  receiveCurrentArt: art => dispatch({type: constants.CURRENT_ART_RECEIVED, art}),
  addNotification: notification => handleError(dispatch, notification),
  clearAllNotifications: () => dispatch({type: constants.CLEAR_ALL_NOTIFICATIONS}),
  updateArtGallery: updatingArtGallery => dispatch({type: constants.UPDATING_ART_GALLERY, updatingArtGallery})
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)