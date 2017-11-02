import { normalize, schema } from 'normalizr'

class ExportArtistsNormalizer {
    normalizeConfig(templatesResponse, artistsReponse) {
        const artistsMap = this.recreateArtistsMap(artistsReponse)
        const normalizedEntities = this.normalizeEntities(artistsMap)
        const pagesMap = this.createPagesMap(artistsReponse, normalizedEntities.entities.artists)
        const exportPages = this.normalizePages(pagesMap)
        const exportFile = this.generateFile(exportPages, templatesResponse)

        return {
            templates: this.normalizeTemplates(templatesResponse),
            categories: normalizedEntities.entities.categories,
            artists: normalizedEntities.entities.artists,
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

    recreateArtistsMap(artistsReponse) {
        return artistsReponse.details.map(a => {
            const totalCategories = [
                { label: 'name', value: a.name },
                { label: 'lastName', value: a.lastName },
                { label: 'email', value: a.email },
                { label: 'phone', value: a.phone }
            ].concat(a.categories)

            return {
                    id: a.id, 
                    name: a.name,
                    profilesImages: a.profilePics || [],
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

        const singleArtist = new schema.Entity('artists', {
            categories: [ category ]
        })

        const artistsSchema = new schema.Array(singleArtist)
        const normalized = normalize(artistsMap, artistsSchema)
        
        return normalized
    }

    createPagesMap(artistsReponse, artistEntities) {
        return artistsReponse.details.map((a, index) => {
            return {
                    id: a.id, 
                    type: "Artist",
                    title: a.name,
                    image: a.photo,
                    withImage: a.photo === "" ? false : true,
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
