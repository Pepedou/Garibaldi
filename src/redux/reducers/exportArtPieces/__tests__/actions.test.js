import * as actions from '../actions'
import * as actionTypes from '../actionTypes'
import * as selectors from '../reducer'
import { Thunk } from 'redux-testkit'

describe('ExportArtPieces Actions', () => {
    it('should dispatch load all export art pieces', () => {
        const normalizedExportArtPieces = {}

        const dispatch = actions.loadExportArtPieces(normalizedExportArtPieces)
        expect(dispatch).toEqual({
            type: actionTypes.EXPORT_ARTPIECES_LOAD_ARTPIECES,
            payload: normalizedExportArtPieces
        })
    })
})