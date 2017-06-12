import * as constants from "../constants"

export const showLoaderReducer = (state = false, {type, showLoader}) => {
  switch (type) {
  case SHOW_LOADER:
    return showLoader
  default:
    return state
  }
}