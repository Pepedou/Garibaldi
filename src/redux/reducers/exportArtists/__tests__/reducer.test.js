import { Reducer } from 'redux-testkit'
import theReducer, { initialState } from '../reducer'
import * as actionTypes from '../actionTypes'

describe('ExportArtists Reducer', () => {
    it('should have initial state', () => {
        expect(theReducer()).toEqual(initialState)
    })

    it('should not affect state', () => {
        Reducer(theReducer).expect({
            type: 'NOT_EXISTING_TYPE'
        }).toReturnState(initialState)
    })

    it('should load export pages', () => {
        const resultState = {
            "ID5000": {
                id: "5000",
                profilesImages: ["1.jpg", "2.jpg"],
                name: "LISA",
                categories: ["4000"]
            },
            "ID5001": {
                id: "5001",
                profilesImages: ["3.jpg", "4.jpg"],
                name: "MARIA",
                categories: ["4002"]
            }
        }

        Reducer(theReducer).expect({
            type: actionTypes.EXPORT_ARTISTS_LOAD_ARTISTS,
            payload: {
                "ID5000": {
                    id: "5000",
                    profilesImages: ["1.jpg", "2.jpg"],
                    name: "LISA",
                    categories: ["4000"]
                },
                "ID5001": {
                    id: "5001",
                    profilesImages: ["3.jpg", "4.jpg"],
                    name: "MARIA",
                    categories: ["4002"]
                }
            }
        }).toReturnState(resultState)
    })
})
