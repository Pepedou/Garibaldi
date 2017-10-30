import * as types from './actionTypes'
import * as selectors from './reducer'

export const loadExportArtPieces = (artPieces) => {
    //TODO: Change to Thunk and call service.loadTemplates
    return { type: types.EXPORT_ARTPIECES_LOAD_ARTPIECES, payload: artPieces }
}