import * as actions from '../actions'
import * as actionTypes from '../actionTypes'
import * as selectors from '../reducer'
import { Thunk } from 'redux-testkit'

describe('ExportPages Actions', () => {

    it('should dispatch load export pages', () => {
        const normalizedExportPages = {}

        const dispatch = actions.loadPages(normalizedExportPages)
        expect(dispatch).toEqual({
            type: actionTypes.EXPORT_PAGES_LOAD_PAGES,
            payload: normalizedExportPages
        })
    })

    it('should dispatch update export page', () => {
        // actionTypes.EXPORT_PAGES_UPDATE_EXPORT_PAGE
        const exportPage = {}

        const dispatch = actions.updatePage(exportPage)
        expect(dispatch).toEqual({
            type: actionTypes.EXPORT_PAGES_UPDATE_EXPORT_PAGE,
            payload: exportPage
        })
    })
})