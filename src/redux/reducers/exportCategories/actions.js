import * as types from './actionTypes'
import * as selectors from './reducer'

export const loadExportCategories = (artPieces) => {
    //TODO: Change to Thunk and call service.loadTemplates
    return { type: types.EXPORT_CATEGORIES_LOAD_CATEGORIES, payload: artPieces }
}