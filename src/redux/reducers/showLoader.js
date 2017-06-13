import * as constants from "../constants"

export const showLoaderReducer = (state = false, {type, showLoader}) => {
  switch (type) {
  case constants.SHOW_LOADER:
    return showLoader
  default:
    return state
  }
}