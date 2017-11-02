import { Reducer } from 'redux-testkit'
import theReducer, { initialState } from '../reducer'
import * as actionTypes from '../actionTypes'

describe('ExportArtPieces Reducer', () => {
    it('should have initial state', () => {
        expect(theReducer()).toEqual(initialState)
    })

    it('should not affect state', () => {
        Reducer(theReducer).expect({
            type: 'NOT_EXISTING_TYPE'
        }).toReturnState(initialState)
    })

    it('should load export artpieces', () => {
        const resultState = {
            "ID6001": {
                id: "ID6001",
                image: "1.jpg",
                title: "MONALISA",
                categories: ["5001"]
            },
            "ID6002": {
                id: "ID6002",
                image: "2.jpg",
                title: "PARAELISA",
                categories: ["5003"]
            }
        }

        Reducer(theReducer).expect({
            type: actionTypes.EXPORT_ARTPIECES_LOAD_ARTPIECES,
            payload: {
                "ID6001": {
                    id: "ID6001",
                    image: "1.jpg",
                    title: "MONALISA",
                    categories: ["5001"]
                },
                "ID6002": {
                    id: "ID6002",
                    image: "2.jpg",
                    title: "PARAELISA",
                    categories: ["5003"]
                }
            }
        }).toReturnState(resultState)
    })
})
