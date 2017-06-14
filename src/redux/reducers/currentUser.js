import * as constants from "../constants"

export let currentUserReducer = (state = {}, action) => {
  let {type, user} = action

  switch (type) {
  case constants.CURRENT_USER_RECIEVED:
    return user
  case constants.CLEAR_CURRENT_USER:
    return {}

  default:
    return state
  }
}