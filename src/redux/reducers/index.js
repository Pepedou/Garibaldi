import { combineReducers } from 'redux'
import {showLoaderReducer, showDropzoneLoaderReducer} from './showLoader'
import {notificationsReducer} from './notifications'
import {currentUserReducer} from './currentUser'
import {artGalleryReducer, updatingArtGalleryReducer} from './artGallery'
import {artistGalleryReducer, updatingArtistGalleryReducer} from './artistGallery'
import {currentArtReducer, updatingCurrentArtReducer} from './currentArt'
import {currentArtistReducer, updatingCurrentArtistReducer} from './currentArtist'
import {showArtOverlayReducer, showArtistOverlayReducer, showFullImageOverlayReducer, showDropZoneOverlayReducer, showPdfPreviewOverlayReducer} from './overlay'
import {checkCardsReducer} from './floatingBar'
import {sourceImageReducer, extraImagesReducer} from './sourceImage'

const reducers = combineReducers({
  showLoader: showLoaderReducer,
  showDropzoneLoader: showDropzoneLoaderReducer,
  notifications: notificationsReducer,
  currentUser: currentUserReducer,
  artGallery: artGalleryReducer,
  updatingArtGallery: updatingArtGalleryReducer,
  artistGallery: artistGalleryReducer,
  updatingArtistGallery: updatingArtistGalleryReducer,
  currentArt: currentArtReducer,
  updatingCurrentArt: updatingCurrentArtReducer,
  currentArtist: currentArtistReducer,
  updatingCurrentArtist: updatingCurrentArtistReducer,
  showArtOverlay: showArtOverlayReducer,
  showArtistOverlay: showArtistOverlayReducer,
  showFullImageOverlay: showFullImageOverlayReducer,
  checkCards: checkCardsReducer,
  sourceImage: sourceImageReducer,
  showDropZoneOverlay: showDropZoneOverlayReducer,
  extraImages: extraImagesReducer,
  showPdfPreviewOverlay: showPdfPreviewOverlayReducer
})

export default reducers