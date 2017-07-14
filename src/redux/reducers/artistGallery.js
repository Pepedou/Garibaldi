import * as constants from "../constants"

export let artistGalleryReducer = (state = [], action) => {
  let {type, artistGallery} = action

  switch (type) {
  case constants.ARTIST_GALLERY_RECIEVED:
    return artistGallery

  default:
    return state
  }
}

export const updatingArtistGalleryReducer = (state = false, {type, updatingArtistGallery}) => {
  switch (type) {
  case constants.UPDATING_ARTIST_GALLERY:
    return updatingArtistGallery
  default:
    return state
  }
}