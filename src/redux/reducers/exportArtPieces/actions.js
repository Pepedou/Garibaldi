import * as types from './actionTypes'

export const loadExportArtPieces = (artPieces) => {
    //TODO: Change to Thunk and call service.loadTemplates
    return { type: types.EXPORT_ARTPIECES_LOAD_ARTPIECES, payload: artPieces }
}