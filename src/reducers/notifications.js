import * as constants from "./constants"

export let notificationsReducer = (state = [], action) => {
  let {type, notification} = action

  switch (type) {
  case constants.ADD_NOTIFICATION:
    return [...state, notification]

  case constants.CLEAR_ALL_NOTIFICATIONS:
    return []

  default:
    return state
  }
}