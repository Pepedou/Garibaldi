import * as constants from "../constants"

export const showLoaderReducer = (state = false, action) => {
  let {type, showLoader} = action

  switch (type) {
  case constants.SHOW_LOADER:
    return showLoader
  default:
    return state
  }
}