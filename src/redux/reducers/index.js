import { combineReducers } from "redux";
import { showLoaderReducer, showDropzoneLoaderReducer } from "./showLoader";
import { notificationsReducer } from "./notifications";
import { currentUserReducer } from "./currentUser";
import { artGalleryReducer, updatingArtGalleryReducer } from "./artGallery";
import {
  artistGalleryReducer,
  updatingArtistGalleryReducer
} from "./artistGallery";
import { currentArtReducer, updatingCurrentArtReducer } from "./currentArt";
import {
  currentArtistReducer,
  updatingCurrentArtistReducer
} from "./currentArtist";
import {
  showArtOverlayReducer,
  showArtistOverlayReducer,
  showFullImageOverlayReducer,
  showDropZoneOverlayReducer,
  showPdfPreviewOverlayReducer
} from "./overlay";
import { checkCardsReducer } from "./floatingBar";
import { sourceImageReducer, extraImagesReducer } from "./sourceImage";
import exportTemplatesReducer from "./templates/reducer";
import exportFileReducer from "./exportFile/reducer";
import exportPagesReducer from "./exportPages/reducer";
import exportCategoriesReducer from "./exportCategories/reducer";
import exportArtistsReducer from "./exportArtists/reducer";
import exportArtPiecesReducer from "./exportArtPieces/reducer";

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
  exportTemplates: exportTemplatesReducer,
  exportFile: exportFileReducer,
  exportPages: exportPagesReducer,
  exportCategories: exportCategoriesReducer,
  exportArtists: exportArtistsReducer,
  exportArtPieces: exportArtPiecesReducer,
  showPdfPreviewOverlay: showPdfPreviewOverlayReducer
});

export default reducers;
