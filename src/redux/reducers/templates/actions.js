import * as types from './actionTypes'
import * as selectors from './reducer'

export const loadTemplateConfigForArtists = (artistsIds) => {
    // TODO: IMPLEMENT
    return 0
}

export const loadTemplateConfigForArtPieces = (artPiecesIds) => {
    // TODO: IMPLEMENT
    return 0
}

export const loadAllTempaltes = (templates) => {
    return { type: types.TEMPLATES_LOAD_TEMPLATES, payload: templates }
}

export const updateTemplate = (updatedTemplate) => {
    return { type: types.TEMPLATES_UPDATE_CURRENT_TEMPLATE, payload: updatedTemplate }
}

const saveTemplate = (saveTemplate) => {
    return { type: types.TEMPLATES_SAVE_EXPORT_TEMPLATE, payload: saveTemplate }
}

const resetCurrentTemplate = () => {
    return { type: types.TEMPLATES_UPDATE_CURRENT_TEMPLATE, payload: selectors.initialState.currentTemplate }
}

export const saveAndRestTemplate = (templateToSave) => {
    return (dispatch) => {
        dispatch(saveTemplate(templateToSave))
        //TODO: Use selectors.getCurrentTemplate() to call service.SaveTemplate
        dispatch(resetCurrentTemplate())
    }
}
