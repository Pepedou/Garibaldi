import * as types from './actionTypes'
import * as selectors from './reducer'

export const loadAllTempaltes = (templates) => {
    //TODO: Change to Thunk and call service.loadTemplates
    return { type: types.TEMPLATES_LOAD_TEMPLATES, payload: templates }
}

// TODO: loadTemplatesForExportArtists
// TODO: loadTemplatesForExportArtPieces

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
