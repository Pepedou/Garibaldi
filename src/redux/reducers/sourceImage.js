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

export let extraImagesReducer = (state = [], action) => {
  let {type, image} = action

  switch (type) {
  case constants.EXTRA_IMAGES_RECIEVED:
    return image

  case constants.ADD_EXTRA_IMAGE:
    return [...state, image]

  case constants.DELETE_EXTRA_IMAGE:
    let index = state.indexOf(image)
    return [...state.slice(0,index), ...state.slice(index+1)]

  default:
    return state
  }
}