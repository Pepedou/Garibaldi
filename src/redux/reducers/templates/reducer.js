import { combineReducers } from 'redux'
import * as actionTypes from './actionTypes'

export const initialState = {
    currentTemplate: {
        id: "",
        name: "",
        logo: "",
        logoPosition: "",
        background: "",
        backgroundPosition: "",
        lineColor: ""
    },
    allTemplates: {}
}

const currentTemplate = (state = initialState.currentTemplate, action = {}) => {
    switch (action.type) {
        case actionTypes.TEMPLATES_UPDATE_CURRENT_TEMPLATE:
        case actionTypes.TEMPLATES_SAVE_EXPORT_TEMPLATE:
            const actionPayload = action.payload
            return {
                id: actionPayload.id || "",
                name: actionPayload.name || "",
                logo: actionPayload.logo || "",
                logoPosition: actionPayload.logoPosition || "",
                background: actionPayload.background || "",
                backgroundPosition: actionPayload.backgroundPosition || "",
                lineColor: actionPayload.lineColor || ""
            }
        default:
            return state
    }
}

const allTemplates = (state = initialState.allTemplates, action = {}) => {
    switch (action.type) {
        case actionTypes.TEMPLATES_SAVE_EXPORT_TEMPLATE:
            return {
                ...state,
                [action.payload.id]: currentTemplate(state[action.payload.id], action)
            }
        case actionTypes.TEMPLATES_LOAD_TEMPLATES:
            return Object.assign({}, state, action.payload)
        default:
            return state
    }
}

const reducer = combineReducers({
    allTemplates,
    currentTemplate
})

export default reducer;

// SELECTORS

export function getCurrentTemplate(state) {
    return state.currentTemplate
}

export function getAllTemplates(state) {
    return state.exportTemplates
}

export function getTemplateById(state, id) {
    return state.exportTemplates[id]
}
