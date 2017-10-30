import * as actions from '../actions'
import * as actionTypes from '../actionTypes'
import * as selectors from '../reducer'
import { Thunk } from 'redux-testkit'

describe('ExportFile Actions', () => {
    it('should dispatch update export file', () => {
        const exportFile = {}

        const dispatch = actions.updateExportFile(exportFile)
        expect(dispatch).toEqual({
            type: actionTypes.EXPORT_FILE_UPDATE_FILE,
            payload: exportFile
        })
    })
})
