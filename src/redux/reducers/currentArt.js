import * as constants from "../constants"

export let currentArtReducer = (state = {}, action) => {
  let {type, art} = action

  switch (type) {
  case constants.CURRENT_ART_RECEIVED:
    return art

  default:
    return state
  }
}

export const updatingCurrentArtReducer = (state = false, {type, updatingCurrentArt}) => {
  switch (type) {
  case UPDATING_CURRENT_ART:
    return updatingCurrentArt
  default:
    return state
  }
}