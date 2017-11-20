import { normalize, schema } from 'normalizr'
import Uuid from 'uuid-lib'

class ExportArtistsNormalizer {
    normalizeConfig(templatesResponse, artPiecesResponse) {
        const artPiecesMap = this.recreateArtPiecesMap(artPiecesResponse)
        const normalizedEntities = this.normalizeEntities(artPiecesMap)
        const pagesMap = this.createPagesMap(artPiecesResponse, normalizedEntities.entities.artPieces)
        const exportPages = this.normalizePages(pagesMap)
        const exportFile = this.generateFile(exportPages, templatesResponse)

        return {
            templates: this.normalizeTemplates(templatesResponse),
            categories: normalizedEntities.entities.categories,
            artPieces: normalizedEntities.entities.artPieces,
            pages: exportPages,
            file: exportFile
        }
    }

    normalizeTemplates(templatesResponse) {
        const singleTemplateSchema = new schema.Entity('templates')
        const templatesSchema = new schema.Array(singleTemplateSchema)
        const normalized = normalize(templatesResponse, templatesSchema)
        return normalized.entities.templates
    }

    recreateArtPiecesMap(artPiecesResponse) {
        return artPiecesResponse.details.map(a => {
            const totalCategories = [
                { label: 'Pieza', value: a.title },
                { label: 'Autor', value: a.author },
                { label: 'Medidas', value: a.measurements },
                { label: 'Técnica', value: a.technique },
                { label: 'Serie', value: a.series },
                { label: 'Tiraje', value: a.tiraje },
                { label: 'Año', value: a.year },
                { label: 'Precio', value: a.price }
            ].concat(a.categories)

            return {
                    id: a.id, 
                    image: a.images.thumbnail || "",
                    title: a.title,
                    categories: totalCategories.map((c, index) => {
                        return {
                            id: Uuid.raw(),
                            label: c.label,
                            value: c.value
                        }
                    })
            }
        })
    }

    normalizeEntities(artistsMap) {
        const category = new schema.Entity('categories')

        const singleArtPiece = new schema.Entity('artPieces', {
            categories: [ category ]
        })

        const artPiecesSchema = new schema.Array(singleArtPiece)
        const normalized = normalize(artistsMap, artPiecesSchema)
        
        return normalized
    }

    createPagesMap(artistsReponse, artistEntities) {
        return artistsReponse.details.map((a, index) => {
            return {
                    id: a.id, 
                    type: "ArtPiece",
                    title: a.title,
                    image: a.images.thumbnail,
                    withImage: true,
                    categories: artistEntities[a.id].categories
            }
        })
    }

    normalizePages(pagesMap) {
        return pagesMap.reduce((previous, current) => {
            return {...previous, [current.id]: current }
        }, {})
    }

    generateFile(pages, templatesResponse) {
        return {
            "EXPFILE1": {
                id: "EXPFILE1",
                template: templatesResponse.length > 0 ? templatesResponse[0].id : "",
                pages: Object.keys(pages)
            }
        }
    }
}

export default new ExportArtistsNormalizer()
