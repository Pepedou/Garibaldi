import { Reducer } from 'redux-testkit'
import theReducer, { initialState } from '../reducer'
import * as actionTypes from '../actionTypes'

describe('ExportPages Reducer', () => {
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
            "ID3001": {
                id: "ID3001",
                type: "Artist",
                title: "ArtistaUno",
                image: "image_in_page.png",
                withImage: true,
                categories: ["4000"]
            },
            "ID3002": {
                id: "ID3002",
                type: "ArtPiece",
                title: "Obra1",
                image: "artpiece.png",
                withImage: true,
                categories: ["4001"]
            }
        }

        Reducer(theReducer).expect({
            type: actionTypes.EXPORT_PAGES_LOAD_PAGES,
            payload: {
                "ID3001": {
                    id: "ID3001",
                    type: "Artist",
                    title: "ArtistaUno",
                    image: "image_in_page.png",
                    withImage: true,
                    categories: ["4000"]
                },
                "ID3002": {
                    id: "ID3002",
                    type: "ArtPiece",
                    title: "Obra1",
                    image: "artpiece.png",
                    withImage: true,
                    categories: ["4001"]
                }
            }
        }).toReturnState(resultState)
    })

    it('should update existing page', () => {
        const resultState = {
            "ID3001": {
                id: "ID3001",
                type: "Artist",
                title: "Mariana",
                image: "image_in_page.png",
                withImage: true,
                categories: ["4000", "4001"]
            },
            "ID3002": {
                id: "ID3002",
                type: "ArtPiece",
                title: "Obra1",
                image: "artpiece.png",
                withImage: true,
                categories: ["4001"]
            }
        }

        Reducer(theReducer).withState({
            "ID3001": {
                id: "ID3001",
                type: "Artist",
                title: "ArtistaUno",
                image: "image_in_page.png",
                withImage: true,
                categories: ["4000"]
            },
            "ID3002": {
                id: "ID3002",
                type: "ArtPiece",
                title: "Obra1",
                image: "artpiece.png",
                withImage: true,
                categories: ["4001"]
            }
        }).expect({
            type: actionTypes.EXPORT_PAGES_UPDATE_EXPORT_PAGE,
            payload: {
                id: "ID3001",
                type: "Artist",
                title: "Mariana",
                image: "image_in_page.png",
                withImage: true,
                categories: ["4000", "4001"]
            }
        }).toReturnState(resultState)
    })
})
