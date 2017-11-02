import * as actions from '../actions'
import * as actionTypes from '../actionTypes'
import * as selectors from '../reducer'
import { Thunk } from 'redux-testkit'

describe('ExportArtists Actions', () => {
    it('should dispatch load all export artists', () => {
        const normalizedExportArtists = {}

        const dispatch = actions.loadExportArtists(normalizedExportArtists)
        expect(dispatch).toEqual({
            type: actionTypes.EXPORT_ARTISTS_LOAD_ARTISTS,
            payload: normalizedExportArtists
        })
    })
})