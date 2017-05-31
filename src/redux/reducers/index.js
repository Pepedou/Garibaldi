import { combineReducers } from 'redux'
import {notificationsReducer} from './notifications'
import {artGalleryReducer} from './artGallery'

const reducers = combineReducers({
  notifications: notificationsReducer,
  artGallery: artGalleryReducer
})

export default reducers