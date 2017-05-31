import * as constants from "../constants"

export let artGalleryReducer = (state = [], action) => {
  let {type, artGallery} = action

  switch (type) {
  case constants.ART_GALLERY_RECIEVED:
    return artGallery

  default:
    return state
  }
}