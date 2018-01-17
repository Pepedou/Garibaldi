import apiRoutes from './apiRoutes'

const baseUrl = `${apiRoutes.getServiceUrl()}/api`

class ArtistServices {
    getAll() {
        return fetch(`${baseUrl}/Artists`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('No se puede consultar la información de los artistas por el momento');
            } 
            return res.json()
        })
    }

    getDetail(id) {
        return fetch(`${baseUrl}/Artists/${id}/getArtistDetail`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('El detalle del artista no se puede consultar en este momento');
            }
            return res.json()
        })
    }

    update(id, artist) {
        const artistToUpdate = Object.assign({}, artist)

        return fetch(`${baseUrl}/Artists/${id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(artistToUpdate)
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('El artista no se pudo editar');
            }
            return res.json()
        })
    }

    destroy(id) {
        return fetch(`${baseUrl}/Artists/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('El artista no se pudo eliminar');
            }
        })
    }

    create(artist) {
        return fetch(`${baseUrl}/Artists`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(artist)
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('El artista no se pudo crear');
            }
            return res.json()
        })
    }

    destroyMany(ids) {
        const toEliminate = {
            ids: Object.assign({}, ids)
        }

        return fetch(`${baseUrl}/Artists/eliminate`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(toEliminate)
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Los artistas no se pudieron eliminar');
            }
        })
    }

    detailFor(ids) {
        const jsonIds = JSON.stringify(ids)

        return fetch(`${baseUrl}/Artists/detailFor?artistsIds=${jsonIds}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Los artistas no se pudieron obtener');
            }
            return res.json()           
        })
    }
}

export default new ArtistServices()