import { Reducer } from 'redux-testkit'
import theReducer, { initialState } from '../reducer'
import * as actionTypes from '../actionTypes'

describe('ExportCategories Reducer', () => {
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
            "ID4000   ": {
                id: "ID4000",
                label: "Integrantes",
                value: "Lisa, Jisoo, Jenny, Rosé"
            },
            "ID4001": {
                id: "ID4001",
                label: "Categoria Inventada",
                value: "Valores aleatorios"
            }
        }

        Reducer(theReducer).expect({
            type: actionTypes.EXPORT_CATEGORIES_LOAD_CATEGORIES,
            payload: {
                "ID4000   ": {
                    id: "ID4000",
                    label: "Integrantes",
                    value: "Lisa, Jisoo, Jenny, Rosé"
                },
                "ID4001": {
                    id: "ID4001",
                    label: "Categoria Inventada",
                    value: "Valores aleatorios"
                }
            }
        }).toReturnState(resultState)
    })
})
