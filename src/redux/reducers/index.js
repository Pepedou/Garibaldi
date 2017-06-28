import { combineReducers } from 'redux'
import {showLoaderReducer} from './showLoader'
import {notificationsReducer} from './notifications'
import {currentUserReducer} from './currentUser'
import {artGalleryReducer, updatingArtGalleryReducer} from './artGallery'
import {currentArtReducer} from './currentArt'

const reducers = combineReducers({
  showLoader: showLoaderReducer,
  notifications: notificationsReducer,
  currentUser: currentUserReducer,
  artGallery: artGalleryReducer,
  updatingArtGallery: updatingArtGalleryReducer,
  currentArt: currentArtReducer
})

export default reducers