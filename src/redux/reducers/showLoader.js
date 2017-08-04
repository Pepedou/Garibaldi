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

export const showDropzoneLoaderReducer = (state = false, action) => {
  let {type, showDropzoneLoader} = action

  switch (type) {
  case constants.SHOW_DROPZONE_LOADER:
    return showDropzoneLoader
  default:
    return state
  }
}