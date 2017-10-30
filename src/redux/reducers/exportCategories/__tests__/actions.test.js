import * as actions from '../actions'
import * as actionTypes from '../actionTypes'
import * as selectors from '../reducer'
import { Thunk } from 'redux-testkit'

describe('ExportCategories Actions', () => {
    it('should dispatch load all export categories', () => {
        const normalizedCategories = {}

        const dispatch = actions.loadExportCategories(normalizedCategories)
        expect(dispatch).toEqual({
            type: actionTypes.EXPORT_CATEGORIES_LOAD_CATEGORIES,
            payload: normalizedCategories
        })
    })
})