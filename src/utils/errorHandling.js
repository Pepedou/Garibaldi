import * as constants from '../redux/constants'

export let handleError = (dispatch, notification) => {
    dispatch({type: constants.ADD_NOTIFICATION, notification})
}