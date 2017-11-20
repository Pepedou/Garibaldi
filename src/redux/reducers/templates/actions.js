import * as types from './actionTypes'
import * as selectors from './reducer'
import * as artistsActions from '../exportArtists/actions'
import * as artPiecesActions from '../exportArtPieces/actions'
import * as categoriesActions from '../exportCategories/actions'
import * as pagesActions from '../exportPages/actions'
import * as fileActions from '../exportFile/actions'
import ExportTemplatesServices from '../../../utils/services/exportTemplatesServices'
import ArtistsServices from '../../../utils/services/artistServices'
import ArtPiecesServices from '../../../utils/services/artPiecesServices'
import ExportArtistsNormalizer from '../../../utils/normalizers/exportArtistsNormalizer'
import ExportArtPiecesNormalizer from '../../../utils/normalizers/exportArtPiecesNormalizer'

export const loadAllTempaltes = (templates) => {
    return { type: types.TEMPLATES_LOAD_TEMPLATES, payload: templates }
}

export const updateTemplate = (updatedTemplate) => {
    return { type: types.TEMPLATES_UPDATE_CURRENT_TEMPLATE, payload: updatedTemplate }
}

const saveTemplate = (saveTemplate) => {
    return { type: types.TEMPLATES_SAVE_EXPORT_TEMPLATE, payload: saveTemplate }
}

const resetCurrentTemplate = () => {
    return { type: types.RESET_TEMPLATE }
}

export const saveAndRestTemplate = (templateToSave) => {
    return (dispatch) => {
        dispatch(saveTemplate(templateToSave))
        //TODO: Use selectors.getCurrentTemplate() to call service.SaveTemplate
        dispatch(resetCurrentTemplate())
    }
}

export const loadTemplateConfigForArtists = (artistsIds) => {
    return async(dispatch) => {
        const fetchedTemplates = await ExportTemplatesServices.getAll()
        const fetchedArtists = await ArtistsServices.detailFor(artistsIds)

        const { templates, artists, categories, pages, file } = ExportArtistsNormalizer.normalizeConfig(fetchedTemplates, fetchedArtists)

        dispatch(resetCurrentTemplate())
        // dispatch(resetExportArtists())
        // dispatch(resetExportCategories())
        // dispatch(resetExportPages())
        // dispatch(resetExportFile())
        dispatch(loadAllTempaltes(templates)) // Dispatch an update for exportTemplates.allTemplates
        dispatch(artistsActions.loadExportArtists(artists)) // Dispatch an update for exportArtists
        dispatch(categoriesActions.loadExportCategories(categories)) // Dispatch an update for exportCategories
        dispatch(pagesActions.loadPages(pages)) // Dispatch an update for exportPages
        dispatch(fileActions.updateExportFile(file)) // Dispatch an update for exportFile
    }
}

export const loadTemplateConfigForArtPieces = (artPiecesIds) => {
    return async(dispatch) => {
        const fetchedTemplates = await ExportTemplatesServices.getAll()
        const fetchedArtPieces = await ArtPiecesServices.detailFor(artPiecesIds)

        const { templates, artPieces, categories, pages, file } = ExportArtPiecesNormalizer.normalizeConfig(fetchedTemplates, fetchedArtPieces)

        dispatch(loadAllTempaltes(templates)) // Dispatch an update for exportTemplates.allTemplates
        dispatch(artPiecesActions.loadExportArtPieces(artPieces)) // Dispatch an update for exportArtPieces
        dispatch(categoriesActions.loadExportCategories(categories))// Dispatch an update for exportCategories
        dispatch(pagesActions.loadPages(pages)) // Dispatch an update for exportPages
        dispatch(fileActions.updateExportFile(file)) // Dispatch an update for exportFile
    }
}
