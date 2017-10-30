import * as actionTypes from './actionTypes'

// This is a lookup table
export const initialState = {
}

const exportPage = (state, action) => {
    switch(action.type) {
        case actionTypes.EXPORT_PAGES_UPDATE_EXPORT_PAGE:
            const actionPayload = action.payload
            return {
                id: actionPayload.id,
                type: actionPayload.type || "",
                title: actionPayload.title || "",
                image: actionPayload.image || "",
                withImage: actionPayload.withImage || false,
                categories: actionPayload.categories || []
            }
        default:
            return state
    }
}

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case actionTypes.EXPORT_PAGES_LOAD_PAGES:    
            return Object.assign({}, state, action.payload)
        case actionTypes.EXPORT_PAGES_UPDATE_EXPORT_PAGE: 
            return {
                ...state,
                [action.payload.id]: exportPage(state[action.payload.id], action)
            }
        default:
            return state
    }
}

// SELECTORS

export function getExportPages(state) {
    return Object.keys(state.exportPages).map(p => state.exportPages[p])
}

export function getExportPageById(state, id) {
    return state.exportPages[id]
}
