import * as types from './actionTypes'

export const loadPages = (pages) => {
    return { type: types.EXPORT_PAGES_LOAD_PAGES, payload: pages }
}

export const updatePage = (page) => {
    return { type: types.EXPORT_PAGES_UPDATE_EXPORT_PAGE, payload: page }
}

export const resetExportPages = () => {
    return { type: types.EXPORT_PAGES_RESET }
}
