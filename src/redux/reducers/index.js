import { combineReducers } from 'redux'
import {notificationsReducer} from './notifications'
import {currentUserReducer} from './currentUser'
import {artGalleryReducer} from './artGallery'

const reducers = combineReducers({
  notifications: notificationsReducer,
  currentUser: currentUserReducer,
  artGallery: artGalleryReducer
})

export default reducers