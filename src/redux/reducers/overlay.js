import * as constants from "../constants"

export let showArtOverlayReducer = (state = false, action) => {
  let {type, show} = action

  switch (type) {
  case constants.SHOW_ART_OVERLAY:
    return show

  default:
    return state
  }
}

export let showArtistOverlayReducer = (state = false, action) => {
  let {type, show} = action

  switch (type) {
  case constants.SHOW_ARTIST_OVERLAY:
    return show

  default:
    return state
  }
}

export let showFullImageOverlayReducer = (state = false, action) => {
  let {type, show} = action

  switch (type) {
  case constants.SHOW_FULL_IMAGE_OVERLAY:
    return show

  default:
    return state
  }
}