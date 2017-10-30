import * as actions from '../actions'
import * as actionTypes from '../actionTypes'
import * as selectors from '../reducer'
import { Thunk } from 'redux-testkit'
import * as exportFileActionTypes from '../../exportFile/actionTypes'
import * as exportArtistsActionTypes from '../../exportArtists/actionTypes'
import * as exportArtPiecesActionTypes from '../../exportArtPieces/actionTypes'
import * as exportCategoriesActionTypes from '../../exportCategories/actionTypes'
import * as exportPagesActionTypes from '../../exportPages/actionTypes'
import ExportTemplatesServices from '../../../../utils/services/exportTemplatesServices'
import ArtistsServices from '../../../../utils/services/artistServices'
import ArtPiecesServices from '../../../../utils/services/artPiecesServices'
jest.mock('../../../../utils/services/exportTemplatesServices.js')
jest.mock('../../../../utils/services/artistServices.js')
jest.mock('../../../../utils/services/artPiecesServices.js')

describe('Templates Actions', () => {

    it('should dispatch all templates', () => {
        const normalizedTemplates = {}

        const dispatch = actions.loadAllTempaltes(normalizedTemplates)
        expect(dispatch).toEqual({
            type: actionTypes.TEMPLATES_LOAD_TEMPLATES,
            payload: normalizedTemplates
        })
    })

    it('should dispatch template update', () => {
        const updatedTemplate = {
            id: "1000",
            name: "Plantilla1",
            logo: "image1.png",
            logoPosition: "logo-top-left",
            background: "image2.png",
            backgroundPosition: "back-center",
            lineColor: "#FFFFFF"
        }

        const dispatch = actions.updateTemplate(updatedTemplate);

        expect(dispatch).toEqual({
            type: actionTypes.TEMPLATES_UPDATE_CURRENT_TEMPLATE,
            payload: updatedTemplate
        })
    })

    it('should handle save and reset actions dispatching', () => {

        const templateToSave = {
            id: "1000",
            name: "Plantilla1",
            logo: "image1.png",
            logoPosition: "logo-top-left",
            background: "image2.png",
            backgroundPosition: "back-center",
            lineColor: "#FFFFFF"
        }

        const dispacthes = Thunk(actions.saveAndRestTemplate).execute(templateToSave)

        expect(dispacthes.length).toBe(2)
        expect(dispacthes[0].getAction()).toEqual({
            type: actionTypes.TEMPLATES_SAVE_EXPORT_TEMPLATE,
            payload: templateToSave
        })
        expect(dispacthes[1].getAction()).toEqual({
            type: actionTypes.TEMPLATES_UPDATE_CURRENT_TEMPLATE,
            payload: {
                id: "",
                name: "",
                logo: "",
                logoPosition: "",
                background: "",
                backgroundPosition: "",
                lineColor: ""
            }
        })
    })

    it('should dispatch config loading for export artists', async () => {
        const artistsToExport = ["59f680cc9373be0004b3f067"]

        ExportTemplatesServices.getAll.mockReturnValueOnce(new Promise((resolve, reject) => {
            resolve([
                {
                  "id": "59f67b5d9373be0004b3f066",
                  "name": "MY TEMPLATE",
                  "logo": "",
                  "logoPosition": "left",
                  "background": "",
                  "backgroundPosition": "leftTop",
                  "lineColor": "#22194D"
                }
              ])
        }))

        ArtistsServices.detailFor.mockReturnValueOnce(new Promise((resolve, reject) => {
            resolve({
                "details": [
                  {
                    "id": "59f680cc9373be0004b3f067",
                    "detail": {
                      "photo": {
                        "filter": "default",
                        "value": "https://res.cloudinary.com/zamancer/image/upload/v1509327035/oanycesrjyd0pd74cl5p.jpg"
                      },
                      "email": {
                        "filter": "not_empty",
                        "value": "jisoo@correo.com"
                      },
                      "name": {
                        "filter": "not_empty",
                        "value": "Jisoo"
                      },
                      "lastName": {
                        "filter": "default",
                        "value": "Blackpink"
                      },
                      "phone": {
                        "filter": "default",
                        "value": ""
                      },
                      "culturalHelperId": {
                        "filter": "not_empty",
                        "value": "5983b6370516e90004842382"
                      },
                      "culturalHelperName": "Lucia"
                    },
                    "categories": [
                        {
                            "label": "bla",
                            "value": "bla"
                        },
                        {
                            "label": "bla2",
                            "value": "bla2"
                        }
                    ]
                  }
                ]
              })
        }))


        const dispatches = await Thunk(actions.loadTemplateConfigForArtists).execute(artistsToExport)

        expect(dispatches.length).toBe(5)

        // Dispatch an update for exportTemplates.allTemplates
        expect(dispatches[0].getAction()).toEqual({
            type: actionTypes.TEMPLATES_LOAD_TEMPLATES,
            payload: {
                "59f67b5d9373be0004b3f066": {
                    id: "59f67b5d9373be0004b3f066",
                    name: "MY TEMPLATE",
                    logo: "",
                    logoPosition: "left",
                    background: "",
                    backgroundPosition: "leftTop",
                    lineColor: "#22194D"
                }
            }
        })

        // Dispatch an update for exportArtists
        expect(dispatches[1].getAction()).toEqual({
            type: exportArtistsActionTypes.EXPORT_ARTISTS_LOAD_ARTISTS,
            payload: {
                "59f680cc9373be0004b3f067": {
                    id: "59f680cc9373be0004b3f067",
                    profilesImages: [],
                    name: "Jisoo",
                    categories: ["EXPCAT1", "EXPCAT2", "EXPCAT3", "EXPCAT4", "EXPCAT5", "EXPCAT6"]
                }
            }
        })

        // Dispatch an update for exportCategories
        expect(dispatches[2].getAction()).toEqual({
            type: exportCategoriesActionTypes.EXPORT_CATEGORIES_LOAD_CATEGORIES,
            payload: {
                "EXPCAT1": {
                    id: "EXPCAT1",
                    label: "name",
                    value: "Jisoo"
                },
                "EXPCAT2": {
                    id: "EXPCAT2",
                    label: "lastName",
                    value: "Blackpink"
                },
                "EXPCAT3": {
                    id: "EXPCAT3",
                    label: "email",
                    value: "jisoo@correo.com"
                },
                "EXPCAT4": {
                    id: "EXPCAT4",
                    label: "phone",
                    value: ""
                },
                "EXPCAT5": {
                    id: "EXPCAT5",
                    label: "bla",
                    value: "bla"
                },
                "EXPCAT6": {
                    id: "EXPCAT6",
                    label: "bla2",
                    value: "bla2"
                }
            }
        })

        // Dispatch an update for exportPages
        expect(dispatches[3].getAction()).toEqual({
            type: exportPagesActionTypes.EXPORT_PAGES_LOAD_PAGES,
            payload: {
                "EXPPAGE1": {
                    id: "EXPPAGE1",
                    type: "Artist",
                    title: "Jisoo",
                    image: "https://res.cloudinary.com/zamancer/image/upload/v1509327035/oanycesrjyd0pd74cl5p.jpg",
                    withImage: true,
                    categories: ["EXPCAT1", "EXPCAT2", "EXPCAT3", "EXPCAT4", "EXPCAT5", "EXPCAT6"]
                }
            }
        })

        // Dispatch an update for exportFile
        expect(dispatches[4].getAction()).toEqual({
            type: exportFileActionTypes.EXPORT_FILE_UPDATE_FILE,
            payload: {
                "EXPFILE1": {
                    id: "EXPFILE1",
                    template: "",
                    pages: ["EXPPAGE1"]
                }
            }
        })
    })

    it('should dispatch config loading for export artpieces', async () => {
        const artPiecesToExport = ["59f680cc9373be0004b3f067"]

        ExportTemplatesServices.getAll.mockReturnValueOnce(new Promise((resolve, reject) => {
            resolve([
                {
                  "id": "59f67b5d9373be0004b3f066",
                  "name": "MY TEMPLATE",
                  "logo": "",
                  "logoPosition": "left",
                  "background": "",
                  "backgroundPosition": "leftTop",
                  "lineColor": "#22194D"
                }
              ])
        }))

        ArtPiecesServices.detailFor.mockReturnValueOnce(new Promise((resolve, reject) => {
            resolve({
                "details": [
                  {
                    "id": "5987ed014a860000047cd9f8",
                    "detail": {
                      "author": {
                        "filter": "not_empty",
                        "value": "Rose Artista"
                      },
                      "title": {
                        "filter": "not_empty",
                        "value": "Colores"
                      },
                      "technique": {
                        "filter": "default",
                        "value": ""
                      },
                      "materials": {
                        "filter": "default",
                        "value": ""
                      },
                      "measurements": {
                        "filter": "default",
                        "value": ""
                      },
                      "year": {
                        "filter": "default",
                        "value": ""
                      },
                      "source": {
                        "filter": "not_empty",
                        "value": "https://res.cloudinary.com/zamancer/image/upload/v1502080232/v9gktpjqcwu2gt9hqk37.jpg"
                      },
                      "images": {
                        "filter": "not_empty",
                        "value": {
                          "thumbnail": "https://res.cloudinary.com/zamancer/image/upload/c_fill,g_west,h_150,w_150/v1502080232/v9gktpjqcwu2gt9hqk37.jpg",
                          "standard": "https://res.cloudinary.com/zamancer/image/upload/v1502080232/v9gktpjqcwu2gt9hqk37.jpg"
                        }
                      },
                      "description": {
                        "filter": "default",
                        "value": ""
                      },
                      "artistId": {
                        "filter": "not_empty",
                        "value": "5983d3e00516e90004842387"
                      }
                    },
                    "categories": [
                        {
                            "label": "bla",
                            "value": "bla"
                        },
                        {
                            "label": "bla2",
                            "value": "bla2"
                        }
                    ]
                  }
                ]
              })
        }))

        const dispatches = await Thunk(actions.loadTemplateConfigForArtPieces).execute(artPiecesToExport)

        expect(dispatches.length).toBe(5)

        // Dispatch an update for exportTemplates.allTemplates
        expect(dispatches[0].getAction()).toEqual({
            type: actionTypes.TEMPLATES_LOAD_TEMPLATES,
            payload: {
                "59f67b5d9373be0004b3f066": {
                    id: "59f67b5d9373be0004b3f066",
                    name: "MY TEMPLATE",
                    logo: "",
                    logoPosition: "left",
                    background: "",
                    backgroundPosition: "leftTop",
                    lineColor: "#22194D"
                }
            }
        })
        
        // Dispatch an update for exportArtPieces
        expect(dispatches[1].getAction()).toEqual({
            type: exportArtPiecesActionTypes.EXPORT_ARTPIECES_LOAD_ARTPIECES,
            payload: {
                "5987ed014a860000047cd9f8": {
                    id: "5987ed014a860000047cd9f8",
                    image: "https://res.cloudinary.com/zamancer/image/upload/c_fill,g_west,h_150,w_150/v1502080232/v9gktpjqcwu2gt9hqk37.jpg",
                    title: "Colores",
                    categories: ["EXPCAT1", "EXPCAT2", "EXPCAT3", "EXPCAT4", "EXPCAT5", "EXPCAT6", "EXPCAT7", "EXPCAT8"]
                }
            }
        })

        // Dispatch an update for exportCategories
        expect(dispatches[2].getAction()).toEqual({
            type: exportCategoriesActionTypes.EXPORT_CATEGORIES_LOAD_CATEGORIES,
            payload: {
                "EXPCAT1": {
                    id: "EXPCAT1",
                    label: "author",
                    value: "Rose Artista"
                },
                "EXPCAT2": {
                    id: "EXPCAT2",
                    label: "technique",
                    value: ""
                },
                "EXPCAT3": {
                    id: "EXPCAT3",
                    label: "materials",
                    value: ""
                },
                "EXPCAT4": {
                    id: "EXPCAT4",
                    label: "measurements",
                    value: ""
                },
                "EXPCAT5": {
                    id: "EXPCAT5",
                    label: "year",
                    value: ""
                },
                "EXPCAT6": {
                    id: "EXPCAT6",
                    label: "description",
                    value: ""
                },
                "EXPCAT7": {
                    id: "EXPCAT7",
                    label: "bla",
                    value: "bla"
                },
                "EXPCAT8": {
                    id: "EXPCAT8",
                    label: "bla2",
                    value: "bla2"
                }
            }
        })
        // Dispatch an update for exportPages
        expect(dispatches[3].getAction()).toEqual({
            type: exportPagesActionTypes.EXPORT_PAGES_LOAD_PAGES,
            payload: {
                "EXPPAGE1": {
                    id: "EXPPAGE1",
                    type: "ArtPiece",
                    title: "Colores",
                    image: "https://res.cloudinary.com/zamancer/image/upload/c_fill,g_west,h_150,w_150/v1502080232/v9gktpjqcwu2gt9hqk37.jpg",
                    withImage: true,
                    categories: ["EXPCAT1", "EXPCAT2", "EXPCAT3", "EXPCAT4", "EXPCAT5", "EXPCAT6", "EXPCAT7", "EXPCAT8"]
                }
            }
        })
        // Dispatch an update for exportFile
        expect(dispatches[4].getAction()).toEqual({
            type: exportFileActionTypes.EXPORT_FILE_UPDATE_FILE,
            payload: {
                "EXPFILE1" :{
                    id: "EXPFILE1",
                    template: "",
                    pages: ["EXPPAGE1"]
                }
            }
        })
    })
})