import { normalize, schema } from 'normalizr'

class ExportArtistsNormalizer {
    normalizeConfig(templatesResponse, artPiecesResponse) {
        const artPiecesMap = this.recreateArtPiecesMap(artPiecesResponse)
        const normalizedEntities = this.normalizeEntities(artPiecesMap)
        const pagesMap = this.createPagesMap(artPiecesResponse, normalizedEntities.entities.artPieces)
        const exportPages = this.normalizePages(pagesMap)
        const exportFile = this.generateFile(exportPages)

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
                { label: 'author', value: a.detail.author.value },
                { label: 'technique', value: a.detail.technique.value },
                { label: 'materials', value: a.detail.materials.value },
                { label: 'measurements', value: a.detail.measurements.value },
                { label: 'year', value: a.detail.year.value },
                { label: 'description', value: a.detail.description.value }
            ].concat(a.categories)

            return {
                    id: a.id, 
                    image: a.detail.images.value.thumbnail || "",
                    title: a.detail.title.value,
                    categories: totalCategories.map((c, index) => {
                        return {
                            id: 'EXPCAT' + (index + 1),
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
                    id: 'EXPPAGE' + (index + 1), 
                    type: "ArtPiece",
                    title: a.detail.title.value,
                    image: a.detail.images.value.thumbnail,
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

    generateFile(pages) {
        return {
            "EXPFILE1": {
                id: "EXPFILE1",
                template: "",
                pages: Object.keys(pages)
            }
        }
    }
}

export default new ExportArtistsNormalizer()
