import * as types from './actionTypes'
import * as selectors from './reducer'

export const loadExportArtists = (artists) => {
    //TODO: Change to Thunk and call service.loadTemplates
    return { type: types.EXPORT_ARTISTS_LOAD_ARTISTS, payload: artists }
}