import { combineReducers } from 'redux'
import {showLoaderReducer} from './showLoader'
import {notificationsReducer} from './notifications'
import {currentUserReducer} from './currentUser'
import {artGalleryReducer, updatingArtGalleryReducer} from './artGallery'
import {artistGalleryReducer, updatingArtistGalleryReducer} from './artistGallery'
import {currentArtReducer, updatingCurrentArtReducer} from './currentArt'
import {currentArtistReducer, updatingCurrentArtistReducer} from './currentArtist'

const reducers = combineReducers({
  showLoader: showLoaderReducer,
  notifications: notificationsReducer,
  currentUser: currentUserReducer,
  artGallery: artGalleryReducer,
  updatingArtGallery: updatingArtGalleryReducer,
  artistGallery: artistGalleryReducer,
  updatingArtistGallery: updatingArtistGalleryReducer,
  currentArt: currentArtReducer,
  updatingCurrentArt: updatingCurrentArtReducer,
  currentArtist: currentArtistReducer,
  updatingCurrentArtist: updatingCurrentArtistReducer
})

export default reducers