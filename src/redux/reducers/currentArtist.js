import * as constants from "../constants"

export let currentArtistReducer = (state = {}, action) => {
  let {type, artist} = action

  switch (type) {
  case constants.CURRENT_ARTIST_RECEIVED:
    return artist

  default:
    return state
  }
}

export const updatingCurrentArtistReducer = (state = false, {type, updatingCurrentArtist}) => {
  switch (type) {
  case constants.UPDATING_CURRENT_ARTIST:
    return updatingCurrentArtist
  default:
    return state
  }
}