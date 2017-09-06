import * as constants from "../constants"

export let sourceImageReducer = (state = "", action) => {
  let {type, sourceImage} = action

  switch (type) {
  case constants.SOURCE_IMAGE_RECEIVED:
    return sourceImage

  default:
    return state
  }
}